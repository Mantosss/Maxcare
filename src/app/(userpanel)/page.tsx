import About from "@/components/About";
import Appoinment from "@/components/Appoinment";
import Blog from "@/components/Blog";
import Comprehensive from "@/components/Comprehensive";
import Doctors from "@/components/Doctors";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stat from "@/components/Stat";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Wellness from "@/components/Wellness";
import Image from "next/image";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <Services />

      <Stat />

      <Comprehensive />

      <Doctors />

      <Wellness/>

      <Team/>

      <Testimonials/>

      <Blog/>

      <Appoinment />
    </>
  );
}
