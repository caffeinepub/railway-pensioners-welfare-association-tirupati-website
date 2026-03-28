import { BookingStatus } from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useApproveBooking,
  useDeleteBooking,
  useGetAllBookings,
  useRejectBooking,
} from "@/hooks/useQueries";
import { format } from "date-fns";
import {
  Building2,
  Calendar,
  CheckCircle,
  CreditCard,
  FileText,
  IdCard,
  Loader2,
  MapPin,
  Phone,
  Smartphone,
  Trash2,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminBookingPanel() {
  const { data: bookings, isLoading } = useGetAllBookings();
  const approveBooking = useApproveBooking();
  const rejectBooking = useRejectBooking();
  const deleteBooking = useDeleteBooking();
  const [actioningId, setActioningId] = useState<bigint | null>(null);

  const handleApprove = async (id: bigint) => {
    setActioningId(id);
    try {
      await approveBooking.mutateAsync(id);
      toast.success("Booking approved successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to approve booking");
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (id: bigint) => {
    setActioningId(id);
    try {
      await rejectBooking.mutateAsync(id);
      toast.success("Booking rejected");
    } catch (error: any) {
      toast.error(error.message || "Failed to reject booking");
    } finally {
      setActioningId(null);
    }
  };

  const handleDelete = async (id: bigint) => {
    setActioningId(id);
    try {
      await deleteBooking.mutateAsync(id);
      toast.success("Booking deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete booking");
    } finally {
      setActioningId(null);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.pending:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-300"
          >
            Pending
          </Badge>
        );
      case BookingStatus.approved:
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-300"
          >
            Approved
          </Badge>
        );
      case BookingStatus.rejected:
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-300"
          >
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading bookings...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>All Booking Requests</CardTitle>
          <CardDescription>Manage all room booking requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No booking requests yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Booking Requests</CardTitle>
        <CardDescription>
          Manage all room booking requests ({bookings.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id.toString()} className="border-2">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">
                        {booking.guestName}
                      </h3>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{booking.contactNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Smartphone className="h-4 w-4" />
                        <span>Verified: {booking.verifiedMobile || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {format(
                            new Date(Number(booking.checkInDate) / 1000000),
                            "MMM dd, yyyy",
                          )}{" "}
                          -{" "}
                          {format(
                            new Date(Number(booking.checkOutDate) / 1000000),
                            "MMM dd, yyyy",
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>
                          Room {booking.roomNumber === "room1" ? "1" : "2"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{booking.numGuests.toString()} Guest(s)</span>
                      </div>
                    </div>

                    {(booking.ppoNumber ||
                      booking.aadhaarNumber ||
                      booking.address ||
                      booking.pincode ||
                      booking.railwayDivision) && (
                      <div className="border-t pt-3 mt-3">
                        <h4 className="text-sm font-semibold mb-2">
                          Additional Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          {booking.ppoNumber && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <CreditCard className="h-4 w-4" />
                              <span>PPO: {booking.ppoNumber}</span>
                            </div>
                          )}
                          {booking.aadhaarNumber && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <IdCard className="h-4 w-4" />
                              <span>Aadhaar: {booking.aadhaarNumber}</span>
                            </div>
                          )}
                          {booking.railwayDivision && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Building2 className="h-4 w-4" />
                              <span>{booking.railwayDivision}</span>
                            </div>
                          )}
                          {booking.pincode && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>Pincode: {booking.pincode}</span>
                            </div>
                          )}
                          {booking.address && (
                            <div className="flex items-start gap-2 text-muted-foreground md:col-span-2">
                              <MapPin className="h-4 w-4 mt-0.5" />
                              <span>{booking.address}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {booking.notes && (
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-muted-foreground">{booking.notes}</p>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      Requested on:{" "}
                      {format(
                        new Date(Number(booking.createdAt) / 1000000),
                        "MMM dd, yyyy HH:mm",
                      )}
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    {booking.status === BookingStatus.pending && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(booking.id)}
                          disabled={actioningId === booking.id}
                          className="flex-1 lg:flex-none"
                        >
                          {actioningId === booking.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(booking.id)}
                          disabled={actioningId === booking.id}
                          className="flex-1 lg:flex-none"
                        >
                          {actioningId === booking.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </>
                          )}
                        </Button>
                      </>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={actioningId === booking.id}
                          className="flex-1 lg:flex-none"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this booking
                            request? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(booking.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
