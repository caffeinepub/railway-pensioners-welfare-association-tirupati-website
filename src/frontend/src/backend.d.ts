import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AvailabilityInfo {
    status: BookingStatus;
    checkInDate: Time;
    roomNumber: RoomNumber;
    checkOutDate: Time;
}
export type Time = bigint;
export interface BookingRequestInput {
    railwayDivision: string;
    ppoNumber: string;
    checkInDate: Time;
    guestName: string;
    roomNumber: RoomNumber;
    numGuests: bigint;
    address: string;
    notes: string;
    checkOutDate: Time;
    contactNumber: string;
    aadhaarNumber: string;
    pincode: string;
}
export interface BookingRequestUpdate {
    status: BookingStatus;
    railwayDivision: string;
    ppoNumber: string;
    checkInDate: Time;
    guestName: string;
    roomNumber: RoomNumber;
    numGuests: bigint;
    address: string;
    notes: string;
    checkOutDate: Time;
    contactNumber: string;
    aadhaarNumber: string;
    pincode: string;
}
export interface BookingRequest {
    id: bigint;
    status: BookingStatus;
    railwayDivision: string;
    ppoNumber: string;
    verifiedMobile: string;
    createdAt: Time;
    createdBy: Principal;
    checkInDate: Time;
    guestName: string;
    roomNumber: RoomNumber;
    numGuests: bigint;
    address: string;
    notes: string;
    checkOutDate: Time;
    contactNumber: string;
    aadhaarNumber: string;
    pincode: string;
}
export interface UserProfile {
    name: string;
}
export enum BookingStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum RoomNumber {
    room1 = "room1",
    room2 = "room2"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    approveBooking(id: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bulkApproveBookings(ids: Array<bigint>): Promise<void>;
    bulkCreateBookings(requests: Array<BookingRequestInput>): Promise<Array<bigint>>;
    bulkDeleteBookings(ids: Array<bigint>): Promise<void>;
    bulkRejectBookings(ids: Array<bigint>): Promise<void>;
    bulkUpdateBookings(updates: Array<[bigint, BookingRequestUpdate]>): Promise<void>;
    createBooking(request: BookingRequestInput): Promise<bigint | null>;
    createOTP(mobileNumber: string): Promise<string>;
    deleteAllBookings(): Promise<void>;
    deleteBooking(id: bigint): Promise<void>;
    getAllBookings(): Promise<Array<BookingRequest>>;
    getBooking(id: bigint): Promise<BookingRequest>;
    getBookingsByDateRange(checkIn: Time, checkOut: Time): Promise<Array<AvailabilityInfo>>;
    getCallerMobileNumber(): Promise<string | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyBookings(): Promise<Array<BookingRequest>>;
    getRoomAvailability(roomNumber: RoomNumber): Promise<Array<AvailabilityInfo>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isCallerAuthenticated(): Promise<boolean>;
    isMobileAuthenticated(mobileNumber: string): Promise<boolean>;
    rejectBooking(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBooking(id: bigint, updatedRequest: BookingRequestUpdate): Promise<void>;
    verifyOTP(mobileNumber: string, otp: string): Promise<boolean>;
}
