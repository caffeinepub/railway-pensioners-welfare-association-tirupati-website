import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Bool "mo:core/Bool";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import Time "mo:core/Time";
import Array "mo:core/Array";


 actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  let OTP_EXPIRATION_NS : Nat = 10 * 60 * 1_000_000_000;

  type OTPRecord = {
    otp : Text;
    expiresAt : Time.Time;
  };

  type MobileSession = {
    mobileNumber : Text;
    authenticatedAt : Time.Time;
  };

  let mobileOTPs = Map.empty<Text, OTPRecord>();
  let mobileAuths = Map.empty<Text, Bool>();
  let principalToMobile = Map.empty<Principal, MobileSession>();

  private func generateOTP() : Text {
    let digits = "123456";
    digits;
  };

  public shared func createOTP(mobileNumber : Text) : async Text {
    if (mobileNumber.size() < 10) {
      Runtime.trap("Invalid mobile number format");
    };

    let otp = generateOTP();
    let otpRecord : OTPRecord = {
      otp = otp;
      expiresAt = Time.now() + OTP_EXPIRATION_NS;
    };

    mobileOTPs.add(mobileNumber, otpRecord);
    otp;
  };

  public shared ({ caller }) func verifyOTP(mobileNumber : Text, otp : Text) : async Bool {
    switch (mobileOTPs.get(mobileNumber)) {
      case (null) {
        Runtime.trap("No OTP found for this mobile number");
      };
      case (?otpRecord) {
        if (Time.now() > otpRecord.expiresAt) {
          mobileOTPs.remove(mobileNumber);
          Runtime.trap("OTP has expired");
        };

        if (otpRecord.otp == otp) {
          mobileAuths.add(mobileNumber, true);

          let session : MobileSession = {
            mobileNumber = mobileNumber;
            authenticatedAt = Time.now();
          };
          principalToMobile.add(caller, session);

          mobileOTPs.remove(mobileNumber);

          // Automatically assign user role after successful OTP verification
          // This ensures authenticated users can access user-level functions
          let currentRole = AccessControl.getUserRole(accessControlState, caller);
          if (currentRole == #guest) {
            // Only upgrade guests to users, don't downgrade admins
            AccessControl.assignRole(accessControlState, caller, caller, #user);
          };

          return true;
        } else {
          return false;
        };
      };
    };
  };

  public query func isMobileAuthenticated(mobileNumber : Text) : async Bool {
    switch (mobileAuths.get(mobileNumber)) {
      case (null) { false };
      case (?auth) { auth };
    };
  };

  public query ({ caller }) func isCallerAuthenticated() : async Bool {
    switch (principalToMobile.get(caller)) {
      case (null) { false };
      case (?session) {
        switch (mobileAuths.get(session.mobileNumber)) {
          case (null) { false };
          case (?auth) { auth };
        };
      };
    };
  };

  public query ({ caller }) func getCallerMobileNumber() : async ?Text {
    switch (principalToMobile.get(caller)) {
      case (null) { null };
      case (?session) { ?session.mobileNumber };
    };
  };

  type RoomNumber = {
    #room1;
    #room2;
  };

  type BookingStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type BookingRequest = {
    id : Nat;
    guestName : Text;
    contactNumber : Text;
    checkInDate : Time.Time;
    checkOutDate : Time.Time;
    roomNumber : RoomNumber;
    numGuests : Nat;
    notes : Text;
    status : BookingStatus;
    createdAt : Time.Time;
    createdBy : Principal;
    verifiedMobile : Text;
    ppoNumber : Text;
    aadhaarNumber : Text;
    address : Text;
    pincode : Text;
    railwayDivision : Text;
  };

  type BookingRequestInput = {
    guestName : Text;
    contactNumber : Text;
    checkInDate : Time.Time;
    checkOutDate : Time.Time;
    roomNumber : RoomNumber;
    numGuests : Nat;
    notes : Text;
    ppoNumber : Text;
    aadhaarNumber : Text;
    address : Text;
    pincode : Text;
    railwayDivision : Text;
  };

  type BookingRequestUpdate = {
    guestName : Text;
    contactNumber : Text;
    checkInDate : Time.Time;
    checkOutDate : Time.Time;
    roomNumber : RoomNumber;
    numGuests : Nat;
    notes : Text;
    status : BookingStatus;
    ppoNumber : Text;
    aadhaarNumber : Text;
    address : Text;
    pincode : Text;
    railwayDivision : Text;
  };

  type AvailabilityInfo = {
    roomNumber : RoomNumber;
    checkInDate : Time.Time;
    checkOutDate : Time.Time;
    status : BookingStatus;
  };

  var nextBookingId : Nat = 1;
  let bookings = Map.empty<Nat, BookingRequest>();

  public shared ({ caller }) func createBooking(request : BookingRequestInput) : async ?Nat {
    // Verify mobile authentication
    let mobileNumber = switch (principalToMobile.get(caller)) {
      case (null) {
        Runtime.trap("Unauthorized: Mobile authentication required");
      };
      case (?session) { session.mobileNumber };
    };

    let isAuth = switch (mobileAuths.get(mobileNumber)) {
      case (null) { false };
      case (?auth) { auth };
    };

    if (not isAuth) {
      Runtime.trap("Unauthorized: Mobile authentication expired or invalid");
    };

    // Verify user has at least user role
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create bookings");
    };

    let id = nextBookingId;
    let booking : BookingRequest = {
      id;
      guestName = request.guestName;
      contactNumber = request.contactNumber;
      checkInDate = request.checkInDate;
      checkOutDate = request.checkOutDate;
      roomNumber = request.roomNumber;
      numGuests = request.numGuests;
      notes = request.notes;
      status = #pending;
      createdAt = Time.now();
      createdBy = caller;
      verifiedMobile = mobileNumber;
      ppoNumber = request.ppoNumber;
      aadhaarNumber = request.aadhaarNumber;
      address = request.address;
      pincode = request.pincode;
      railwayDivision = request.railwayDivision;
    };
    bookings.add(id, booking);
    nextBookingId += 1;
    ?id;
  };

  public query ({ caller }) func getBooking(id : Nat) : async BookingRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view booking details");
    };
    switch (bookings.get(id)) {
      case (?booking) { booking };
      case (null) { Runtime.trap("Booking not found") };
    };
  };

  public query ({ caller }) func getAllBookings() : async [BookingRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookings.values().toArray();
  };

  public query ({ caller }) func getMyBookings() : async [BookingRequest] {
    // Verify mobile authentication
    let mobileNumber = switch (principalToMobile.get(caller)) {
      case (null) {
        Runtime.trap("Unauthorized: Mobile authentication required");
      };
      case (?session) { session.mobileNumber };
    };

    let isAuth = switch (mobileAuths.get(mobileNumber)) {
      case (null) { false };
      case (?auth) { auth };
    };

    if (not isAuth) {
      Runtime.trap("Unauthorized: Mobile authentication expired or invalid");
    };

    // Verify user has at least user role (not just guest)
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their bookings");
    };

    let myBookings = bookings.values().toArray().filter(
      func(booking) { booking.createdBy == caller }
    );
    myBookings;
  };

  public shared ({ caller }) func updateBooking(id : Nat, updatedRequest : BookingRequestUpdate) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update a booking");
    };
    let existingBooking = switch (bookings.get(id)) {
      case (?booking) { booking };
      case (null) { Runtime.trap("Booking not found") };
    };
    let updatedBooking : BookingRequest = {
      existingBooking with
      guestName = updatedRequest.guestName;
      contactNumber = updatedRequest.contactNumber;
      checkInDate = updatedRequest.checkInDate;
      checkOutDate = updatedRequest.checkOutDate;
      roomNumber = updatedRequest.roomNumber;
      numGuests = updatedRequest.numGuests;
      notes = updatedRequest.notes;
      status = updatedRequest.status;
      ppoNumber = updatedRequest.ppoNumber;
      aadhaarNumber = updatedRequest.aadhaarNumber;
      address = updatedRequest.address;
      pincode = updatedRequest.pincode;
      railwayDivision = updatedRequest.railwayDivision;
    };
    bookings.add(id, updatedBooking);
  };

  public shared ({ caller }) func deleteBooking(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete a booking");
    };
    if (not bookings.containsKey(id)) {
      Runtime.trap("Booking not found");
    };
    bookings.remove(id);
  };

  public shared ({ caller }) func approveBooking(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve a booking");
    };
    let existingBooking = switch (bookings.get(id)) {
      case (?booking) { booking };
      case (null) { Runtime.trap("Booking not found") };
    };
    let updatedBooking : BookingRequest = {
      existingBooking with status = #approved;
    };
    bookings.add(id, updatedBooking);
  };

  public shared ({ caller }) func rejectBooking(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reject a booking");
    };
    let existingBooking = switch (bookings.get(id)) {
      case (?booking) { booking };
      case (null) { Runtime.trap("Booking not found") };
    };
    let updatedBooking : BookingRequest = {
      existingBooking with status = #rejected;
    };
    bookings.add(id, updatedBooking);
  };

  public query (_) func getRoomAvailability(roomNumber : RoomNumber) : async [AvailabilityInfo] {
    let filteredBookings = bookings.values().toArray().filter(
      func(booking) { booking.roomNumber == roomNumber and booking.status == #approved },
    );
    filteredBookings.map(
      func(booking) : AvailabilityInfo {
        {
          roomNumber = booking.roomNumber;
          checkInDate = booking.checkInDate;
          checkOutDate = booking.checkOutDate;
          status = booking.status;
        };
      }
    );
  };

  public query (_) func getBookingsByDateRange(checkIn : Time.Time, checkOut : Time.Time) : async [AvailabilityInfo] {
    let filteredBookings = bookings.values().toArray().filter(
      func(booking) {
        booking.checkInDate < checkOut and booking.checkOutDate > checkIn and booking.status == #approved
      }
    );
    filteredBookings.map(
      func(booking) : AvailabilityInfo {
        {
          roomNumber = booking.roomNumber;
          checkInDate = booking.checkInDate;
          checkOutDate = booking.checkOutDate;
          status = booking.status;
        }
      }
    );
  };

  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func deleteAllBookings() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete all bookings");
    };
    bookings.clear();
    nextBookingId := 1;
  };

  public shared ({ caller }) func bulkCreateBookings(requests : [BookingRequestInput]) : async [Nat] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can bulk create bookings");
    };
    let idList = List.empty<Nat>();
    for (request in requests.values()) {
      let id = nextBookingId;
      let booking : BookingRequest = {
        id;
        guestName = request.guestName;
        contactNumber = request.contactNumber;
        checkInDate = request.checkInDate;
        checkOutDate = request.checkOutDate;
        roomNumber = request.roomNumber;
        numGuests = request.numGuests;
        notes = request.notes;
        status = #pending;
        createdAt = Time.now();
        createdBy = caller;
        verifiedMobile = "admin-created";
        ppoNumber = request.ppoNumber;
        aadhaarNumber = request.aadhaarNumber;
        address = request.address;
        pincode = request.pincode;
        railwayDivision = request.railwayDivision;
      };
      bookings.add(id, booking);
      nextBookingId += 1;
      idList.add(id);
    };
    idList.toArray();
  };

  public shared ({ caller }) func bulkUpdateBookings(updates : [(Nat, BookingRequestUpdate)]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can bulk update bookings");
    };
    for ((id, updatedRequest) in updates.values()) {
      let existingBooking = switch (bookings.get(id)) {
        case (?booking) { booking };
        case (null) { Runtime.trap("Booking not found for id " # id.toText()) };
      };
      let updatedBooking : BookingRequest = {
        existingBooking with
        guestName = updatedRequest.guestName;
        contactNumber = updatedRequest.contactNumber;
        checkInDate = updatedRequest.checkInDate;
        checkOutDate = updatedRequest.checkOutDate;
        roomNumber = updatedRequest.roomNumber;
        numGuests = updatedRequest.numGuests;
        notes = updatedRequest.notes;
        status = updatedRequest.status;
        ppoNumber = updatedRequest.ppoNumber;
        aadhaarNumber = updatedRequest.aadhaarNumber;
        address = updatedRequest.address;
        pincode = updatedRequest.pincode;
        railwayDivision = updatedRequest.railwayDivision;
      };
      bookings.add(id, updatedBooking);
    };
  };

  public shared ({ caller }) func bulkDeleteBookings(ids : [Nat]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can bulk delete bookings");
    };
    for (id in ids.values()) {
      if (not bookings.containsKey(id)) {
        Runtime.trap("Booking not found for id " # id.toText());
      };
      bookings.remove(id);
    };
  };

  public shared ({ caller }) func bulkApproveBookings(ids : [Nat]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can bulk approve bookings");
    };
    for (id in ids.values()) {
      let existingBooking = switch (bookings.get(id)) {
        case (?booking) { booking };
        case (null) { Runtime.trap("Booking not found for id " # id.toText()) };
      };
      let updatedBooking : BookingRequest = {
        existingBooking with status = #approved;
      };
      bookings.add(id, updatedBooking);
    };
  };

  public shared ({ caller }) func bulkRejectBookings(ids : [Nat]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can bulk reject bookings");
    };
    for (id in ids.values()) {
      let existingBooking = switch (bookings.get(id)) {
        case (?booking) { booking };
        case (null) { Runtime.trap("Booking not found for id " # id.toText()) };
      };
      let updatedBooking : BookingRequest = {
        existingBooking with status = #rejected;
      };
      bookings.add(id, updatedBooking);
    };
  };
};

