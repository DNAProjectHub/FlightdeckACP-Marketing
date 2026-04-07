import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import DevModeCallout from "@/components/DevModeCallout";
import ProductSurfaces from "@/components/ProductSurfaces";
import FlightSchool from "@/components/FlightSchool";
import ProofStrip from "@/components/ProofStrip";
import FinalCTA from "@/components/FinalCTA";
import StickyFooterCTA from "@/components/StickyFooterCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <DevModeCallout />
        <ProductSurfaces />
        <FlightSchool />
        <ProofStrip />
        <FinalCTA />
      </main>
      <StickyFooterCTA />
    </>
  );
}
