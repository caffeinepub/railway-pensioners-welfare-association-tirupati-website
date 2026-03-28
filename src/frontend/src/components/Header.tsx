import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

type Page =
  | "home"
  | "history"
  | "facilities"
  | "booking"
  | "membership"
  | "gallery"
  | "contact"
  | "places";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "History", page: "history" },
    { label: "Facilities", page: "facilities" },
    { label: "Room Booking", page: "booking" },
    { label: "Membership", page: "membership" },
    { label: "Gallery", page: "gallery" },
    { label: "Places to Visit", page: "places" },
    { label: "Contact Us", page: "contact" },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <img
              src="/assets/uploads/gemini_generated_image_93cc9e93cc9e93cc-019d3248-54c8-70cf-ac7f-83ddd1931ac8-1.png"
              alt="Railway Pensioners' Welfare Association Logo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-primary-foreground"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold leading-tight">
                Railway Pensioners' Welfare Association
              </h1>
              <p className="text-xs md:text-sm opacity-90">Tirupati</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.page}
                variant={currentPage === item.page ? "secondary" : "ghost"}
                onClick={() => handleNavClick(item.page)}
                className={
                  currentPage === item.page
                    ? "bg-primary-foreground text-primary"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.page}
                variant={currentPage === item.page ? "secondary" : "ghost"}
                onClick={() => handleNavClick(item.page)}
                className={`w-full justify-start ${currentPage === item.page ? "bg-primary-foreground text-primary" : "text-primary-foreground hover:bg-primary-foreground/10"}`}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
