import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { content, type Locale } from "@/lib/cv";

const Divider = () => (
  <div className="section-divider">
    <hr />
  </div>
);

/** The whole single-page site for one locale. */
const HomePage = ({ locale }: { locale: Locale }) => {
  const c = content[locale];

  return (
    <>
      <a href="#content" className="skip-link">
        {c.ui.skipToContent}
      </a>
      <Nav content={c} />
      <main id="content">
        <Hero content={c} />
        <Divider />
        <About content={c} />
        <Divider />
        <Highlights content={c} />
        <Divider />
        <Projects content={c} />
        <Divider />
        <Experience content={c} />
        <Divider />
        <Education content={c} />
        <Divider />
        <Skills content={c} />
        <Divider />
        <Contact content={c} />
      </main>
      <Footer content={c} />
    </>
  );
};

export default HomePage;
