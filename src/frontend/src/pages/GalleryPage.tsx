import { Card } from "@/components/ui/card";

export default function GalleryPage() {
  const buildingImages = [
    {
      src: "/assets/RPA.jpg",
      alt: "Railway Pensioners' Home Building - Front View",
      title: "Our Building",
      description: "The Railway Pensioners' Home in Railway Colony, Tirupati",
    },
    {
      src: "/assets/RPA2.jpg",
      alt: "Railway Pensioners' Home Signboard",
      title: "Association Signboard",
      description: "Official signboard at Railway Colony, Tirupati",
    },
  ];

  const presidentImage = {
    src: "/assets/Kaladhar sir.jpg",
    alt: "Sri K. Kaladhar, President of Railway Pensioners' Welfare Association",
    title: "Sri K. Kaladhar - President",
    description:
      "Sri K. Kaladhar, President of Railway Pensioners' Welfare Association, Tirupati.",
  };

  const secretaryImage = {
    src: "/assets/Sekhar Reddy photo.jpg",
    alt: "Sri B. Sekhar Reddy, Secretary of Railway Pensioners' Welfare Association",
    title: "Sri B. Sekhar Reddy - Secretary",
    description:
      "Sri B. Sekhar Reddy, Secretary of Railway Pensioners' Welfare Association, Tirupati.",
  };

  const treasurerImage = {
    src: "/assets/Kesavulu sir.jpg",
    alt: "Sri K. Kesavulu, Treasurer of Railway Pensioners' Welfare Association",
    title: "Sri K. Kesavulu - Treasurer",
    description:
      "Sri K. Kesavulu, Treasurer - Railway Pensioners' Welfare Association, Tirupati.",
  };

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Photo Gallery
            </h1>
            <p className="text-lg text-muted-foreground">
              A glimpse of our premises and facilities
            </p>
          </div>

          {/* Our President Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Our President
            </h2>
            <div className="flex justify-center">
              <Card className="overflow-hidden border-2 hover:shadow-xl transition-shadow max-w-md w-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={presidentImage.src}
                    alt={presidentImage.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {presidentImage.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {presidentImage.description}
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Our Secretary Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Our Secretary
            </h2>
            <div className="flex justify-center">
              <Card className="overflow-hidden border-2 hover:shadow-xl transition-shadow max-w-md w-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={secretaryImage.src}
                    alt={secretaryImage.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {secretaryImage.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {secretaryImage.description}
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Our Treasurer Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Our Treasurer
            </h2>
            <div className="flex justify-center">
              <Card className="overflow-hidden border-2 hover:shadow-xl transition-shadow max-w-md w-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={treasurerImage.src}
                    alt={treasurerImage.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {treasurerImage.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {treasurerImage.description}
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Building Images Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Our Premises
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {buildingImages.map((image) => (
                <Card
                  key={image.src}
                  className="overflow-hidden border-2 hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {image.title}
                    </h3>
                    <p className="text-muted-foreground">{image.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Card className="border-2 bg-muted/30 p-8">
              <p className="text-lg text-muted-foreground">
                The Railway Pensioners' Association has been serving the railway
                community in Tirupati since 1975. Our premises in Railway Colony
                provide a welcoming space for pensioners and employees to
                gather, celebrate, and access essential services.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
