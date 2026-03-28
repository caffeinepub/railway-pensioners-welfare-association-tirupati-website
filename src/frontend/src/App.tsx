import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ContactPage from "./pages/ContactPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import GalleryPage from "./pages/GalleryPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import MembershipPage from "./pages/MembershipPage";
import PlacesPage from "./pages/PlacesPage";
import RoomBookingPage from "./pages/RoomBookingPage";

type Page =
  | "home"
  | "history"
  | "facilities"
  | "booking"
  | "membership"
  | "gallery"
  | "contact"
  | "places";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "history":
        return <HistoryPage />;
      case "facilities":
        return <FacilitiesPage onNavigate={setCurrentPage} />;
      case "booking":
        return <RoomBookingPage />;
      case "membership":
        return <MembershipPage />;
      case "gallery":
        return <GalleryPage />;
      case "contact":
        return <ContactPage />;
      case "places":
        return <PlacesPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
