
import NavBar from "@/components/Blocks/NavBar";
import Header from "@/components/Blocks/Header";
import PropertyTypes from "@/components/Blocks/PropertyTypes";
import WaterfrontWinners from "@/components/Blocks/WaterfrontWinners";
import DiscoverDestinations from "@/components/Blocks/DiscoverDestinations";
import BestOffers from "@/components/Blocks/BestOffers"; 
import TravelersFavorites from "@/components/Blocks/TravelersFavorites";
import WhereToGo from "@/components/Blocks/WhereToGo";
import Footer from "@/components/Blocks/Footer";

export default function Home() {
  return (
    <div className="min-h-screen px-4 sm:px-8 bg-zinc-50 font-sans dark:bg-black overflow-x-hidden">
      <NavBar />
      <Header />
      <PropertyTypes/>
      <WaterfrontWinners />
      <DiscoverDestinations />
      <BestOffers />
      <TravelersFavorites />
      <WhereToGo />
      <Footer />
    </div>
  );
}
