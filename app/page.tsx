import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FearToStart from "@/components/FearToStart";
import Problem from "@/components/Problem";
import DevModeCallout from "@/components/DevModeCallout";
import ProductSurfaces from "@/components/ProductSurfaces";
import FinalCTA from "@/components/FinalCTA";
import SnapNavigator from "@/components/SnapNavigator";

export default function Home() {
  return (
    <>
      <Nav />
      <SnapNavigator />
      <main>
        <Hero />
        <FearToStart />
        <Problem />
        <DevModeCallout />
        <ProductSurfaces />
        <FinalCTA />
      </main>
    </>
  );
}
