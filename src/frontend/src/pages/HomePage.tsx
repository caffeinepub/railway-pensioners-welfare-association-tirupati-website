import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, CalendarCheck, Heart, Phone, Users } from "lucide-react";

type Page =
  | "home"
  | "history"
  | "facilities"
  | "booking"
  | "membership"
  | "gallery"
  | "contact";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero Section with Banner Images */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Welcome to Railway Pensioners' Welfare Association
              </h2>
              <p className="text-lg md:text-xl opacity-95">
                Dedicated to serving railway pensioners and employees in
                Tirupati with comprehensive support, welfare assistance, and
                quality facilities since 1975.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  onClick={() => onNavigate("booking")}
                >
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  Book Rooms
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => onNavigate("contact")}
                >
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <img
                src="/assets/RPA.jpg"
                alt="Railway Pensioners' Welfare Association Building"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Supporting railway pensioners with essential services and welfare
              assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Health Guidance</CardTitle>
                <CardDescription>
                  Comprehensive health support and medical assistance for
                  pensioners
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Pension Dues</CardTitle>
                <CardDescription>
                  Assistance with pension-related matters and dues settlement
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Welfare Programs</CardTitle>
                <CardDescription>
                  Ongoing welfare initiatives for pensioners and their families
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Support Services</CardTitle>
                <CardDescription>
                  Dedicated support team available to assist with all queries
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Facilities Highlight */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/assets/RPA2.jpg"
                alt="Railway Pensioners' Welfare Association Signboard"
                className="rounded-lg shadow-xl w-full"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Modern Facilities
              </h2>
              <p className="text-lg text-muted-foreground">
                Our premises offer comfortable and well-equipped facilities
                exclusively for railway pensioners and employees.
              </p>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Function Hall</CardTitle>
                    <CardDescription>
                      Air-conditioned mini function hall with 80-member
                      capacity, perfect for gatherings and events. Available at
                      ₹5,000 for 8 hours.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Accommodation</CardTitle>
                    <CardDescription>
                      Comfortable AC rooms including 3 double bedrooms
                      (₹1,000/24hrs) and 1 six-bedded room (₹2,500/24hrs) for
                      your convenience.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => onNavigate("booking")}
              >
                <CalendarCheck className="mr-2 h-5 w-5" />
                Book Rooms Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto">
            Be part of our 300+ member community dedicated to supporting railway
            pensioners
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            onClick={() => onNavigate("membership")}
          >
            Learn About Membership
          </Button>
        </div>
      </section>
    </div>
  );
}
