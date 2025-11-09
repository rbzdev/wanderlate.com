
import NavBar from "@/components/Blocks/NavBar";
import Header from "@/components/Blocks/Header";
import PropertyTypes from "@/components/Blocks/PropertyTypes";
import Footer from "@/components/Blocks/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black overflow-x-hidden">
      <NavBar />
      <Header />
      <PropertyTypes/>
      <Footer />
    </div>
  );
}
