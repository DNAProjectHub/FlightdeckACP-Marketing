import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemOne from "@/components/ProblemOne";
import SolutionOne from "@/components/SolutionOne";
import ProblemTwo from "@/components/ProblemTwo";
import SolutionTwo from "@/components/SolutionTwo";
import HowItWorks from "@/components/HowItWorks";
import Pipeline from "@/components/Pipeline";
import DevModeCallout from "@/components/DevModeCallout";
import ReceiptsMemory from "@/components/ReceiptsMemory";
import FinalCTA from "@/components/FinalCTA";
import SnapNavigator from "@/components/SnapNavigator";

export default function Home() {
  return (
    <>
      <Nav />
      <SnapNavigator />
      <main>
        <Hero />
        <ProblemOne />
        <SolutionOne />
        <ProblemTwo />
        <SolutionTwo />
        <HowItWorks />
        <Pipeline />
        <DevModeCallout />
        <ReceiptsMemory />
        <FinalCTA />
      </main>
    </>
  );
}
