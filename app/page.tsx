import Invitation from "@/components/Invitation";
import {
  Couple,
  Footer,
  GallerySection,
  GiftSection,
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
      <GallerySection />
      <GiftSection />
      <RsvpSection />
      <InvitedBy />
      <Footer />
    </Invitation>
  );
}
