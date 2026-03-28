import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Award,
  HandHeart,
  Heart,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

export default function MembershipPage() {
  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Membership</h1>
            <p className="text-lg text-muted-foreground">
              Join our thriving community of railway pensioners
            </p>
          </div>

          {/* Member Count Highlight */}
          <Card className="border-2 bg-primary text-primary-foreground mb-8">
            <CardContent className="pt-8 pb-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                    <Users className="h-10 w-10 text-primary-foreground" />
                  </div>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-2">300+</h2>
                <p className="text-xl opacity-95">Active Members</p>
                <p className="text-sm opacity-80 mt-2">
                  A strong community of railway pensioners and employees
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">
                    Welfare Initiatives
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p className="text-lg leading-relaxed">
                  Our association is committed to the ongoing welfare of all
                  members. We provide comprehensive support programs designed to
                  enhance the quality of life for railway pensioners and their
                  families.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <HandHeart className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Community Support
                      </p>
                      <p className="text-sm">
                        Regular meetings and social gatherings
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Advocacy</p>
                      <p className="text-sm">
                        Representation for pensioner rights
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Health Assistance</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p className="text-lg leading-relaxed">
                  We understand that health is a primary concern for our
                  members. Our association provides guidance and support for
                  health-related matters, helping members navigate medical
                  services and healthcare options.
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded">
                  <p className="text-sm">
                    <strong className="text-foreground">Our Commitment:</strong>{" "}
                    We work to ensure that all members have access to
                    information about healthcare facilities, medical schemes,
                    and wellness programs available to railway pensioners.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Pension Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p className="text-lg leading-relaxed">
                  Navigating pension-related matters can be complex. Our
                  experienced team assists members with pension dues,
                  documentation, and resolving any issues related to pension
                  disbursement.
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Assistance with pension documentation and paperwork
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Guidance on pension-related queries and concerns
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Support in resolving pension dues and arrears</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Information about pension revisions and updates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Member Benefits</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p className="text-lg leading-relaxed">
                  As a member of the Railway Pensioners' Association, you gain
                  access to our facilities and services designed specifically
                  for the railway community.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground mb-2">
                      Facility Access
                    </p>
                    <p className="text-sm">
                      Use of function hall and accommodation facilities
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground mb-2">
                      Community Events
                    </p>
                    <p className="text-sm">
                      Participation in social and cultural programs
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground mb-2">
                      Information Updates
                    </p>
                    <p className="text-sm">
                      Regular updates on railway pension matters
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground mb-2">
                      Support Network
                    </p>
                    <p className="text-sm">
                      Connect with fellow railway pensioners
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
