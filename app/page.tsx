import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import DevModeCallout from "@/components/DevModeCallout";
import ProductSurfaces from "@/components/ProductSurfaces";
import FlightSchool from "@/components/FlightSchool";
import FinalCTA from "@/components/FinalCTA";
import SnapNavigator from "@/components/SnapNavigator";

export default function Home() {
  return (
    <>
      <Nav />
      <SnapNavigator />
      <main>
        <Hero />
        <Problem />
        <DevModeCallout />
        <ProductSurfaces />
        <FlightSchool />
        <FinalCTA />
      </main>
    </>
  );
}
