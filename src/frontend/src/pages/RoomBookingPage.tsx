import { UserRole } from "@/backend";
import AdminBookingPanel from "@/components/AdminBookingPanel";
import BookingForm from "@/components/BookingForm";
import MyBookings from "@/components/MyBookings";
import OTPAuth from "@/components/OTPAuth";
import UserProfileSetup from "@/components/UserProfileSetup";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useGetCallerMobileNumber,
  useGetCallerUserRole,
  useIsCallerAuthenticated,
} from "@/hooks/useQueries";
import { Info, Loader2, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function RoomBookingPage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: userRole } = useGetCallerUserRole();
  const {
    data: isOTPAuthenticated,
    isLoading: authCheckLoading,
    refetch: refetchAuth,
  } = useIsCallerAuthenticated();
  const { data: mobileNumber } = useGetCallerMobileNumber();
  const [activeTab, setActiveTab] = useState<string>("book");

  const isAuthenticated = !!identity;
  const isAdmin = userRole === UserRole.admin;
  const isLoggingIn = loginStatus === "logging-in";

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error("Login error:", error);
      }
    }
  };

  const handleOTPAuthSuccess = () => {
    refetchAuth();
  };

  if (!isAuthenticated) {
    return (
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Room Booking
              </h1>
              <p className="text-lg text-muted-foreground">
                Book your stay at our comfortable Double AC Bedrooms
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Login Required</CardTitle>
                <CardDescription>
                  Please login to access the room booking system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleAuth}
                  disabled={isLoggingIn}
                  className="w-full"
                  size="lg"
                >
                  {isLoggingIn
                    ? "Logging in..."
                    : "Login with Internet Identity"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (authCheckLoading) {
    return (
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">
                Checking authentication status...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isOTPAuthenticated) {
    return (
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Room Booking
              </h1>
              <p className="text-lg text-muted-foreground">
                Verify your mobile number to continue
              </p>
            </div>

            <OTPAuth onAuthSuccess={handleOTPAuthSuccess} />

            <div className="mt-8 text-center">
              <Button variant="outline" onClick={handleAuth}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Room Booking
            </h1>
            <p className="text-lg text-muted-foreground">
              Book your stay at our comfortable Double AC Bedrooms
            </p>
            {mobileNumber && (
              <p className="text-sm text-muted-foreground mt-2">
                Verified Mobile: {mobileNumber}
              </p>
            )}
          </div>

          <UserProfileSetup />

          <Alert className="mb-8 border-primary bg-primary/5">
            <Info className="h-5 w-5 text-primary" />
            <AlertDescription className="text-base">
              <strong>Room Details:</strong> Double AC Bedrooms with modern
              amenities including geyser for hot water. Rate: ₹1,000 per 24
              hours. Available exclusively for Railway Pensioners and Employees.
            </AlertDescription>
          </Alert>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
              <TabsTrigger value="book">Book Room</TabsTrigger>
              <TabsTrigger value="mybookings">My Bookings</TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="admin">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Panel
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="book">
              <BookingForm />
            </TabsContent>

            <TabsContent value="mybookings">
              <MyBookings />
            </TabsContent>

            {isAdmin && (
              <TabsContent value="admin">
                <AdminBookingPanel />
              </TabsContent>
            )}
          </Tabs>

          <div className="mt-8 text-center">
            <Button variant="outline" onClick={handleAuth}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
