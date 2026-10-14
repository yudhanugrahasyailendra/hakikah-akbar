import Invitation from "@/components/Invitation";
import {
  Couple,
  Footer,
  Hero,
  InvitedBy,
  RsvpSection,
  SaveTheDate,
} from "@/components/Sections";

export default function Home() {
  return (
    <Invitation>
      <Hero />
      <Couple />
      <SaveTheDate />
      <RsvpSection />
      <InvitedBy />
      <Footer />
    </Invitation>
  );
}
