import { RoomNumber } from "@/backend";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBooking, useGetRoomAvailability } from "@/hooks/useQueries";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BookingFormData {
  guestName: string;
  contactNumber: string;
  roomNumber: string;
  numGuests: number;
  notes: string;
  ppoNumber: string;
  aadhaarNumber: string;
  address: string;
  pincode: string;
  railwayDivision: string;
}

export default function BookingForm() {
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>();
  const createBooking = useCreateBooking();
  const { data: room1Availability } = useGetRoomAvailability(RoomNumber.room1);
  const { data: room2Availability } = useGetRoomAvailability(RoomNumber.room2);

  const isDateBooked = (date: Date, roomNumber: string) => {
    const availability =
      roomNumber === "room1" ? room1Availability : room2Availability;
    if (!availability) return false;

    const dateTime = date.getTime();
    return availability.some((booking) => {
      const checkIn = Number(booking.checkInDate) / 1000000;
      const checkOut = Number(booking.checkOutDate) / 1000000;
      return dateTime >= checkIn && dateTime <= checkOut;
    });
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    if (!selectedRoom) {
      toast.error("Please select a room");
      return;
    }

    try {
      const roomNumber =
        selectedRoom === "room1" ? RoomNumber.room1 : RoomNumber.room2;

      await createBooking.mutateAsync({
        guestName: data.guestName,
        contactNumber: data.contactNumber,
        checkInDate: BigInt(checkInDate.getTime() * 1000000),
        checkOutDate: BigInt(checkOutDate.getTime() * 1000000),
        roomNumber,
        numGuests: BigInt(data.numGuests),
        notes: data.notes,
        ppoNumber: data.ppoNumber,
        aadhaarNumber: data.aadhaarNumber,
        address: data.address,
        pincode: data.pincode,
        railwayDivision: data.railwayDivision,
      });

      toast.success(
        "Booking request submitted successfully! Awaiting admin approval.",
      );
      reset();
      setCheckInDate(undefined);
      setCheckOutDate(undefined);
      setSelectedRoom("");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit booking request");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book a Room</CardTitle>
        <CardDescription>
          Fill in the details below to request a room booking. Your request will
          be reviewed by our admin team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="guestName">Guest Name *</Label>
              <Input
                id="guestName"
                {...register("guestName", {
                  required: "Guest name is required",
                })}
                placeholder="Enter your full name"
              />
              {errors.guestName && (
                <p className="text-sm text-destructive">
                  {errors.guestName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <Input
                id="contactNumber"
                {...register("contactNumber", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                })}
                placeholder="10-digit mobile number"
              />
              {errors.contactNumber && (
                <p className="text-sm text-destructive">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Select Room *</Label>
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="room1">
                  Room No. 1 (Double AC Bedroom)
                </SelectItem>
                <SelectItem value="room2">
                  Room No. 2 (Double AC Bedroom)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Check-in Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      if (date < today) return true;
                      if (selectedRoom && isDateBooked(date, selectedRoom))
                        return true;
                      return false;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Check-out Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    disabled={(date) => {
                      if (!checkInDate) return true;
                      if (date <= checkInDate) return true;
                      if (selectedRoom && isDateBooked(date, selectedRoom))
                        return true;
                      return false;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {selectedRoom && checkInDate && (
            <Alert>
              <AlertDescription>
                {isDateBooked(checkInDate, selectedRoom) ? (
                  <span className="text-destructive font-medium">
                    This room is not available for the selected dates. Please
                    choose different dates.
                  </span>
                ) : (
                  <span className="text-green-600 font-medium">
                    This room is available for your selected dates!
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="numGuests">Number of Guests *</Label>
            <Input
              id="numGuests"
              type="number"
              min="1"
              max="2"
              {...register("numGuests", {
                required: "Number of guests is required",
                min: { value: 1, message: "At least 1 guest required" },
                max: { value: 2, message: "Maximum 2 guests per double room" },
              })}
              placeholder="1-2 guests"
            />
            {errors.numGuests && (
              <p className="text-sm text-destructive">
                {errors.numGuests.message}
              </p>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">
              Additional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ppoNumber">PPO Number *</Label>
                <Input
                  id="ppoNumber"
                  {...register("ppoNumber", {
                    required: "PPO Number is required",
                  })}
                  placeholder="Enter your PPO Number"
                />
                {errors.ppoNumber && (
                  <p className="text-sm text-destructive">
                    {errors.ppoNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
                <Input
                  id="aadhaarNumber"
                  {...register("aadhaarNumber", {
                    required: "Aadhaar Number is required",
                    pattern: {
                      value: /^[0-9]{12}$/,
                      message: "Please enter a valid 12-digit Aadhaar number",
                    },
                  })}
                  placeholder="12-digit Aadhaar number"
                  maxLength={12}
                />
                {errors.aadhaarNumber && (
                  <p className="text-sm text-destructive">
                    {errors.aadhaarNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                {...register("address", { required: "Address is required" })}
                placeholder="Enter your complete address"
                rows={3}
              />
              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  {...register("pincode", {
                    required: "Pincode is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Please enter a valid 6-digit pincode",
                    },
                  })}
                  placeholder="6-digit pincode"
                  maxLength={6}
                />
                {errors.pincode && (
                  <p className="text-sm text-destructive">
                    {errors.pincode.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="railwayDivision">
                  Belongs to Railway (Division/Zone) *
                </Label>
                <Input
                  id="railwayDivision"
                  {...register("railwayDivision", {
                    required: "Railway Division/Zone is required",
                  })}
                  placeholder="e.g., South Central Railway, Guntakal Division"
                />
                {errors.railwayDivision && (
                  <p className="text-sm text-destructive">
                    {errors.railwayDivision.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Any special requests or requirements"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={createBooking.isPending}
          >
            {createBooking.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Booking Request"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
