import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const tirumalaTirths = [
  "Varaha Swamy",
  "Venkateswara Swamy",
  "Chakra Teertham",
  "Shilatoranam",
  "Bedi Anjaneya Swamy Temple",
  "Anjaneya Swamy Mandiram",
  "Lakshmi Hayagreeva Swamy Temple",
  "Japali Anjaneya Swamy",
  "Papanashanam",
  "Aakash Ganga",
];

const tirupatiLocal = [
  "Kapila Teertham Tirupati",
  "Govinda Raja Swamy Mandiram",
  "ISKCON Temple",
  "Tatayyagunta Gangamma Devasthanam",
  "Sri Kalyankambika Neelakantheshwara Swamy Temple",
  "Sri Kanyakaparameshvari Alayam",
  "Shiva Nagendra Swamy Mandiram",
  "Sri Radha Krishna Mandiram",
  "Siddhi Buddhi Vignayak Mandiram",
  "Kodanda Ramalayam",
];

const surroundingAreas = [
  { name: "Tiruchanoor (Alimelumangam)", distance: "5.3 km" },
  { name: "Vakulamatha Temple", distance: "8.1 km" },
  { name: "Srinivasudu Mangapuram", distance: "10.6 km" },
  { name: "Lalitha Peetham - Srinivas Daggara Mangapuram", distance: "11 km" },
  { name: "Agastyeswaralayam", distance: "11.1 km" },
  { name: "Appalayagunta - Abhaya Venkateswara Swamy", distance: "18.9 km" },
  { name: "Gudimallam", distance: "30.4 km" },
  {
    name: "Thondamanupuram - Shridevi Bhudevi Sameta Prasanna Venkateswara Swamy",
    distance: "33.7 km",
  },
  { name: "Kalahasti - Sri Kalahastishwara Mandiram", distance: "38.7 km" },
  { name: "Narayana Vanam", distance: "40.8 km" },
  { name: "Kanipakam", distance: "64.9 km" },
  { name: "Vedanarayana Devalayam, Nagulapuram", distance: "65.8 km" },
  { name: "Aragonda (Ardhagiri)", distance: "75.5 km" },
  { name: "Pallikondeshwara Swamy Alayam, Suratapalli", distance: "76.7 km" },
];

const tamilNaduPlaces = [
  { name: "Tiruttani - Subrahmanyeswara Swamy", distance: "69.3 km" },
  { name: "Vellore - Golden Temple", distance: "~90 km" },
];

const darshans = [
  {
    title: "Special Entry Darshan (₹300)",
    description:
      "Provides faster access (1–2 hours) compared to free darshan. Tickets are booked online through the official TTD website or mobile app. Quotas are released monthly and Aadhaar registration is required.",
    color: "bg-indigo-100",
    textColor: "text-indigo-800",
    icon: "1",
  },
  {
    title: "Sarva Darshan (Free / SSD)",
    description:
      "Free darshan where time-slot tokens are issued at designated counters in Tirupati (SSD) or directly at the Vaikuntam Queue Complex. Waiting time is typically 5–20 hours depending on the season.",
    color: "bg-sky-100",
    textColor: "text-sky-800",
    icon: "2",
  },
  {
    title: "Divya Darshan (Free)",
    description:
      "A free darshan exclusively for pilgrims who walk up to Tirumala via the Alipiri or Srivari Mettu footpaths. Token scanning is required at the top of the hill. Usually offers quicker entry than regular queue darshan.",
    color: "bg-teal-100",
    textColor: "text-teal-800",
    icon: "3",
  },
];

export default function PlacesPage() {
  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Places to Visit in Tirupati
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tirupati, the holy pilgrim city, is surrounded by many sacred
            temples and divine shrines. Here is a curated guide of key places
            for your spiritual journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Tirumala */}
          <Card className="border-2 shadow-md">
            <CardHeader className="bg-primary/5 rounded-t-lg">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">
                  Tirumala
                </Badge>
              </div>
              <CardTitle className="text-2xl">
                Tirumala - Sacred Hill Temples
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ol className="space-y-3">
                {tirumalaTirths.map((place) => (
                  <li key={place} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                      {tirumalaTirths.indexOf(place) + 1}
                    </span>
                    <span className="text-base mt-0.5">{place}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Tirupati Local */}
          <Card className="border-2 shadow-md">
            <CardHeader className="bg-primary/5 rounded-t-lg">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">Local</Badge>
              </div>
              <CardTitle className="text-2xl">Tirupati Local Temples</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ol className="space-y-3">
                {tirupatiLocal.map((place) => (
                  <li key={place} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-700">
                      {tirupatiLocal.indexOf(place) + 1}
                    </span>
                    <span className="text-base mt-0.5">{place}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Surrounding Areas */}
        <Card className="border-2 shadow-md mb-8">
          <CardHeader className="bg-primary/5 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-500 text-white">Nearby</Badge>
            </div>
            <CardTitle className="text-2xl">
              Tirupati Surrounding Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {surroundingAreas.map((place) => (
                <div
                  key={place.name}
                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                >
                  <span className="flex-shrink-0 w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-700">
                    {surroundingAreas.indexOf(place) + 1}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{place.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {place.distance} from Tirupati
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tamil Nadu */}
        <Card className="border-2 shadow-md">
          <CardHeader className="bg-primary/5 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-600 text-white">Tamil Nadu</Badge>
            </div>
            <CardTitle className="text-2xl">Tirupati to Tamil Nadu</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tamilNaduPlaces.map((place) => (
                <div
                  key={place.name}
                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                >
                  <span className="flex-shrink-0 w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-700">
                    {tamilNaduPlaces.indexOf(place) + 1}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{place.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {place.distance} from Tirupati
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tirumala Darshan Booking Procedures */}
        <Card className="border-2 shadow-md mt-8" data-ocid="darshan.card">
          <CardHeader className="bg-indigo-50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Badge className="bg-indigo-600 text-white">Darshan Info</Badge>
            </div>
            <CardTitle className="text-2xl text-indigo-900">
              Tirumala Darshan Booking Procedures
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Tirumala offers various darshan types including ₹300 Special Entry
              (online), free Sarva Darshan (tokens/spot), and special quotas for
              senior citizens, infants, and pilgrims walking up the hills.
              Tickets are booked online via the official TTD website or mobile
              app, with quotas releasing monthly, requiring Aadhaar for
              registration.
            </p>

            <h3 className="text-lg font-semibold mb-4 text-indigo-800">
              Types of Tirumala Darshan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {darshans.map((d) => (
                <div
                  key={d.title}
                  className={`rounded-lg p-4 border ${d.color} border-indigo-100`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex-shrink-0 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      {d.icon}
                    </span>
                    <h4 className={`font-semibold text-sm ${d.textColor}`}>
                      {d.title}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {d.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <p className="text-sm text-indigo-800">
                <strong>Tip:</strong> Book your Special Entry Darshan tickets
                well in advance at{" "}
                <a
                  href="https://tirupatibalaji.ap.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  tirupatibalaji.ap.gov.in
                </a>{" "}
                or the official{" "}
                <span className="font-semibold">TTD Devotees App</span>. Carry a
                printed copy of your ticket and a valid Aadhaar card for entry.
              </p>
            </div>

            {/* TTD Helpline */}
            <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-base font-semibold text-red-800 mb-3 flex items-center gap-2">
                📞 TTD Helpline &amp; Contact Details (24×7)
              </h3>
              <p className="text-sm text-red-700 mb-4">
                For assistance with Tirumala Tirupati Devasthanam (TTD)
                services, you can reach the official 24×7 support through the
                following contact details:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white rounded-md p-3 border border-red-100">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                    Toll Free
                  </p>
                  <p className="text-base font-bold text-red-700">
                    1800 425 4141
                  </p>
                </div>
                <div className="bg-white rounded-md p-3 border border-red-100">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                    Call Center
                  </p>
                  <p className="text-base font-bold text-red-700">155257</p>
                </div>
                <div className="bg-white rounded-md p-3 border border-red-100">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                    WhatsApp Support
                  </p>
                  <p className="text-base font-bold text-red-700">
                    93993 99399
                  </p>
                </div>
                <div className="bg-white rounded-md p-3 border border-red-100">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                    E-mail
                  </p>
                  <p className="text-base font-bold text-red-700 break-all">
                    helpdesk@tirumala.org
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-col sm:flex-row gap-2 text-xs text-muted-foreground">
                <span>
                  🌐 TTD Website:{" "}
                  <a
                    href="https://tirupatibalaji.ap.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                  >
                    tirupatibalaji.ap.gov.in
                  </a>
                </span>
                <span className="hidden sm:inline">|</span>
                <span>
                  📱 Mobile App:{" "}
                  <span className="font-semibold">TTD Devotees App</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Note */}
        <div className="mt-10 p-5 bg-primary/5 rounded-lg border border-primary/20 text-center">
          <p className="text-muted-foreground text-sm">
            <strong>Note:</strong> For visiting pilgrims staying at Railway
            Pensioners Welfare Association, Tirupati, the above sacred places
            are easily accessible from our Railway Colony location. We wish all
            our guests a blessed and fulfilling pilgrimage.
          </p>
        </div>
      </div>
    </div>
  );
}
