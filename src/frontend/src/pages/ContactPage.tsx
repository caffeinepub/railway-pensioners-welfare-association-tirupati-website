import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = {
    email: "amuddam@yahoo.com",
    address:
      "Railway Colony, Srinivasa Nagar, near 35ward Sachivalayam, Tirupati - 517 501",
  };

  const contactPersons = [
    { name: "Sri A Parameswara Raju", phone: "96768 47960" },
    { name: "Sri K Kaladhar", phone: "98666 28750" },
    { name: "Sri M Ashok", phone: "798199 8864" },
    { name: "Sri D Obulraju", phone: "98850 17795" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (non-functional as per specification)
    setTimeout(() => {
      toast.success("Message sent successfully! We will get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Get in touch with the Railway Pensioners' Association
            </p>
          </div>

          {/* Contact Information Cards - Prominent Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Address</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="hover:text-primary transition-colors break-all"
                      >
                        {contactInfo.email}
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Persons Section */}
          <Card className="border-2 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Persons</CardTitle>
              <CardDescription>
                Reach out to our team members for assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactPersons.map((person) => (
                  <div
                    key={person.name}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-1">
                        {person.name}
                      </p>
                      <a
                        href={`tel:${person.phone.replace(/\s/g, "")}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {person.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* QR Code Location Section */}
          <div className="flex flex-col items-center mb-12 space-y-4">
            <h2 className="text-2xl font-semibold text-center">
              Scan for Location
            </h2>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
              <img
                src="/assets/RPA Location.jpg"
                alt="QR Code for Location"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Use your phone camera to open our location in maps
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Additional Information */}
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Visit Us</CardTitle>
                  <CardDescription>
                    We're here to help railway pensioners and employees
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Office Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Please visit during regular business hours
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Facility Bookings</h3>
                    <p className="text-sm text-muted-foreground">
                      For facility bookings and inquiries, contact us in advance
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Membership Inquiries</h3>
                    <p className="text-sm text-muted-foreground">
                      Contact us to learn more about membership benefits and how
                      to join
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Your message will be stored and reviewed by our team. We'll
                    respond as soon as possible.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
