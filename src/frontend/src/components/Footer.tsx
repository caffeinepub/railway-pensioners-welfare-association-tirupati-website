import { Heart, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const contactInfo = {
    email: "amuddam@yahoo.com",
    address:
      "Railway Colony, Srinivasa Nagar, near 35ward Sachivalayam, Tirupati - 517 501",
  };

  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">
              Railway Pensioners' Welfare Association
            </h3>
            <p className="text-sm opacity-90">
              Serving railway pensioners and employees in Tirupati since 1975.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2 opacity-90">
              <li>Home</li>
              <li>History</li>
              <li>Facilities</li>
              <li>Room Booking</li>
              <li>Membership</li>
              <li>Gallery</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">Contact Information</h3>
            <div className="text-sm space-y-3 opacity-90">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>{contactInfo.address}</p>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:underline"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-90">
          <p className="flex items-center justify-center gap-2">
            © 2025 Railway Pensioners' Welfare Association. Built with{" "}
            <Heart className="h-4 w-4 fill-current" /> using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80 transition-opacity"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
