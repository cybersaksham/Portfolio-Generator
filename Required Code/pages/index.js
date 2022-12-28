import Header from "../Components/Header";
import About from "../Components/About";
import Resume from "../Components/Resume";
import Portfolio from "../Components/Portfolio";
import Contact from "../Components/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <Resume />
      {/* <Service /> */}
      <Portfolio />
      <Contact />
    </>
  );
}
