import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bed,
  Building2,
  CalendarCheck,
  CheckCircle,
  Clock,
  Droplet,
  IndianRupee,
  Snowflake,
  Users,
} from "lucide-react";

type Page =
  | "home"
  | "history"
  | "facilities"
  | "booking"
  | "membership"
  | "gallery"
  | "contact";

interface FacilitiesPageProps {
  onNavigate: (page: Page) => void;
}

export default function FacilitiesPage({ onNavigate }: FacilitiesPageProps) {
  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Facilities
            </h1>
            <p className="text-lg text-muted-foreground">
              Modern, comfortable amenities exclusively for railway pensioners
              and employees
            </p>
          </div>

          <Alert className="mb-8 border-primary bg-primary/5">
            <Users className="h-5 w-5 text-primary" />
            <AlertDescription className="text-base">
              <strong>Important:</strong> All facilities are available
              exclusively for Railway Pensioners and Railway Employees only.
            </AlertDescription>
          </Alert>

          <div className="space-y-8">
            {/* Function Hall */}
            <Card className="border-2 overflow-hidden">
              <div className="bg-primary/5 border-b-2 border-primary/10">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                      <Building2 className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        AC Mini Function Hall
                      </CardTitle>
                      <CardDescription className="text-base">
                        Ground Floor
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </div>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Details Section */}
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Capacity</p>
                          <p className="text-muted-foreground">
                            Up to 80 members
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Snowflake className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Air Conditioned</p>
                          <p className="text-muted-foreground">
                            Fully climate controlled
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <IndianRupee className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Rental Charge</p>
                          <p className="text-muted-foreground">
                            ₹5,000 per booking
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Duration</p>
                          <p className="text-muted-foreground">
                            8 hours per booking
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Time Slots</p>
                          <p className="text-muted-foreground text-sm">
                            08:00 AM – 02:00 PM
                            <br />
                            02:00 PM – 10:00 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="bg-muted/50 rounded-lg p-4 flex items-center">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Perfect for:</strong>{" "}
                      Family gatherings, community meetings, celebrations, and
                      social events. The hall is equipped with modern amenities
                      to ensure your event is comfortable and memorable. Choose
                      from two convenient time slots to suit your schedule.
                    </p>
                  </div>
                </div>

                {/* Official Photo Gallery */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Official Photos
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="rounded-lg overflow-hidden border-2 border-primary/10">
                      <img
                        src="/assets/Screenshot_20251224_161910.jpg"
                        alt="Wide-angle view of the air-conditioned AC Mini Function Hall with comfortable seating for up to 80 members"
                        className="w-full h-auto object-cover aspect-[4/3]"
                      />
                      <div className="bg-muted/50 px-4 py-2 text-center">
                        <p className="text-sm font-medium text-muted-foreground">
                          AC Mini Function Hall - View 1
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg overflow-hidden border-2 border-primary/10">
                      <img
                        src="/assets/Screenshot_20251224_162001.jpg"
                        alt="The AC Mini Function Hall tastefully decorated for a special event, showcasing its spacious and elegant interior design"
                        className="w-full h-auto object-cover aspect-[4/3]"
                      />
                      <div className="bg-muted/50 px-4 py-2 text-center">
                        <p className="text-sm font-medium text-muted-foreground">
                          AC Mini Function Hall - Decorated View
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg overflow-hidden border-2 border-primary/10 sm:col-span-2 lg:col-span-1">
                      <img
                        src="/assets/Screenshot_20251224_162044.jpg"
                        alt="Another perspective of the AC Mini Function Hall highlighting its large open space and comfortable facilities"
                        className="w-full h-auto object-cover aspect-[4/3]"
                      />
                      <div className="bg-muted/50 px-4 py-2 text-center">
                        <p className="text-sm font-medium text-muted-foreground">
                          AC Mini Function Hall - View 2
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accommodation */}
            <Card className="border-2 overflow-hidden">
              <div className="bg-primary/5 border-b-2 border-primary/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                        <Bed className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">
                          Accommodation Facilities
                        </CardTitle>
                        <CardDescription className="text-base">
                          First Floor
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      onClick={() => onNavigate("booking")}
                      className="hidden sm:flex"
                    >
                      <CalendarCheck className="mr-2 h-4 w-4" />
                      Book Rooms
                    </Button>
                  </div>
                </CardHeader>
              </div>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {/* Double Bedrooms */}
                  <div className="border-2 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Double AC Bedrooms
                        </h3>
                        <p className="text-muted-foreground">
                          3 rooms available (Room No. 1 & Room No. 2 bookable
                          online)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ₹1,000
                        </p>
                        <p className="text-sm text-muted-foreground">
                          per 24 hours
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      {/* Amenities Section */}
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Air Conditioned</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Double Occupancy</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Clean & Comfortable</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Well Maintained</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Modern Furnishings</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Private Bathroom</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Droplet className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              Geyser for Hot Water
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description Section */}
                      <div className="bg-muted/50 rounded-lg p-4 flex items-center">
                        <p className="text-sm text-muted-foreground">
                          Our Double AC Bedrooms offer a comfortable and
                          relaxing stay with modern amenities. Each room is
                          well-furnished with quality bedding, seating area, and
                          all necessary comfort features including{" "}
                          <strong className="text-foreground">
                            a geyser for hot water
                          </strong>{" "}
                          for a pleasant experience.
                        </p>
                      </div>
                    </div>

                    {/* Official Photo Gallery for Double Bed Rooms */}
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-4">
                        Official Photos
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-lg overflow-hidden border-2 border-primary/10">
                          <img
                            src="/assets/Screenshot_20251224_162823.jpg"
                            alt="View of the spacious Double Bed AC Room featuring comfortable bedding, modern decor, and geyser for hot water"
                            className="w-full h-auto object-cover aspect-[4/3]"
                          />
                          <div className="bg-muted/50 px-4 py-2 text-center">
                            <p className="text-sm font-medium text-muted-foreground">
                              Spacious Double Bed AC Room
                            </p>
                          </div>
                        </div>

                        <div className="rounded-lg overflow-hidden border-2 border-primary/10">
                          <img
                            src="/assets/Screenshot_20251224_162948.jpg"
                            alt="Another angle of the Double Bed AC Room showing the elegant furnishings, cozy atmosphere, and geyser for hot water"
                            className="w-full h-auto object-cover aspect-[4/3]"
                          />
                          <div className="bg-muted/50 px-4 py-2 text-center">
                            <p className="text-sm font-medium text-muted-foreground">
                              Well-furnished Double Bed AC Room
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Six-Bedded Room */}
                  <div className="border-2 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Six-Bedded AC Room
                        </h3>
                        <p className="text-muted-foreground">
                          1 room available
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ₹2,500
                        </p>
                        <p className="text-sm text-muted-foreground">
                          per 24 hours
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Amenities Section */}
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">2 Air Conditioners</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">2 Washrooms</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Sleeps 6 People</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Spacious Layout</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Ideal for Groups</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm">Family Friendly</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Droplet className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              Geyser for Hot Water
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description Section */}
                      <div className="bg-muted/50 rounded-lg p-4 flex items-center">
                        <p className="text-sm text-muted-foreground">
                          Perfect for larger families or groups traveling
                          together. This spacious room accommodates up to six
                          people comfortably with{" "}
                          <strong className="text-foreground">
                            dual air conditioning
                          </strong>
                          ,
                          <strong className="text-foreground">
                            {" "}
                            2 washrooms
                          </strong>
                          , and{" "}
                          <strong className="text-foreground">
                            a geyser for hot water
                          </strong>
                          , enhancing the comfort of group stays. The room
                          offers excellent value with modern amenities designed
                          for convenience and relaxation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 mt-6">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Note:</strong> All
                    accommodation facilities are well-maintained and regularly
                    cleaned. Advance booking is recommended to ensure
                    availability. Contact us for reservations and more
                    information.
                  </p>
                </div>

                <div className="mt-6 sm:hidden">
                  <Button
                    onClick={() => onNavigate("booking")}
                    className="w-full"
                  >
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    Book Rooms
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
