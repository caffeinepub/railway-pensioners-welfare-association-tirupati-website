import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Building, Calendar, Users } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our History</h1>
            <p className="text-lg text-muted-foreground">
              A legacy of service spanning nearly five decades
            </p>
          </div>

          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">
                    The Beginning - 1975
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p className="text-lg leading-relaxed">
                  The Railway Pensioners' Association, Tirupati, was established
                  in 1975 as the
                  <strong className="text-foreground">
                    {" "}
                    Railway House Building Society
                  </strong>
                  . This marked the beginning of a dedicated effort to serve the
                  railway community in Tirupati.
                </p>
                <p className="text-lg leading-relaxed">
                  The founding members recognized the need for a unified
                  organization that could address the housing and welfare needs
                  of railway employees and pensioners in the region.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">
                    Railway Colony Development
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p className="text-lg leading-relaxed">
                  One of the association's most significant achievements was the
                  creation of the
                  <strong className="text-foreground">
                    {" "}
                    Railway Colony layout
                  </strong>{" "}
                  in Tirupati. This ambitious project provided housing solutions
                  for railway employees and pensioners, creating a thriving
                  community.
                </p>
                <p className="text-lg leading-relaxed">
                  The colony was meticulously planned to ensure comfortable
                  living conditions with proper infrastructure, amenities, and a
                  sense of community among railway families.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Continued Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p className="text-lg leading-relaxed">
                  Over the decades, the association has evolved from a housing
                  society to a comprehensive welfare organization. Today, we
                  continue our mission to support railway pensioners and
                  employees through various initiatives.
                </p>
                <p className="text-lg leading-relaxed">
                  Our focus has expanded to include health guidance, assistance
                  with pension dues, welfare programs, and providing quality
                  facilities for community gatherings and accommodation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 bg-primary text-primary-foreground">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Our Legacy Today</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed opacity-95">
                  The Railway Pensioners' Association, Tirupati, stands as a
                  testament to the power of community and collective effort.
                  With over 300 active members, we continue to honor our
                  founding principles while adapting to meet the evolving needs
                  of our community.
                </p>
                <p className="text-lg leading-relaxed opacity-95">
                  Our journey from 1975 to today reflects our unwavering
                  commitment to serving those who dedicated their lives to
                  Indian Railways. We remain proud of our heritage and excited
                  about our future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
