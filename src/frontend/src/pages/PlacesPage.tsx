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
