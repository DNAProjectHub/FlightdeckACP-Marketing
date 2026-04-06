import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import Problem from "@/components/Problem";
import SystemScroll from "@/components/SystemScroll";
import ProductSurfaces from "@/components/ProductSurfaces";
import FlightSchool from "@/components/FlightSchool";
import FinalCTA from "@/components/FinalCTA";
import StickyFooterCTA from "@/components/StickyFooterCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <Problem />
        <SystemScroll />
        <ProductSurfaces />
        <FlightSchool />
        <FinalCTA />
      </main>
      <StickyFooterCTA />
    </>
  );
}
