import Banner from "@/component/homePage/banner/Banner";
import FeaturedSection from "@/component/homePage/FeaturedSection";
import MembershipPage from "@/component/homePage/MembershipPage";
import ReviewPage from "@/component/homePage/ReviewPage";
import ScrollReveal from "@/component/homePage/ScrollReveal";
import WhyChooseNestudy from "@/component/homePage/WhyChoosePage";

export default function Home() {
  return (
    <div className="font-cinzel">
      <Banner />

      <ScrollReveal>
        <FeaturedSection/>
      </ScrollReveal>

      <ScrollReveal>
        <WhyChooseNestudy />
      </ScrollReveal>

      <ScrollReveal>
        <ReviewPage />
      </ScrollReveal>

      <ScrollReveal>
        <MembershipPage />
      </ScrollReveal>
    </div>
  );
}