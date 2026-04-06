import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import DevModeCallout from "@/components/DevModeCallout";
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
        <DevModeCallout />
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
