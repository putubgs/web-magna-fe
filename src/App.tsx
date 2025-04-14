import "./App.css";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Marquee from "react-fast-marquee";
import AboutCard from "./components/aboutCard";
import { ArrowIcon } from "./components/icons/arrowIcon";
import InstaIcon from "./components/icons/instaIcon";
import LinkedinIcon from "./components/icons/linkedinIcon";
import MailIcon from "./components/icons/mailIcon";
import { AboutData } from "./data/aboutData";
import { logos, logos2 } from "./data/companyData";

function App() {
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  function handleBurger() {
    setBurgerStatus(!burgerStatus);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="smooth-scroll relative" id="main">
      {/* Header */}
      <div className="sticky top-0 bg-black z-[50] flex justify-between py-6 px-4 md:px-[120px] items-center shadow-md">
        <a className="flex items-center space-x-4 cursor-pointer" href="#main">
          <img
            src="/assets/logo/business-units/Magna.png"
            alt="Magna Logo"
            width={30}
            height={56}
          />
          <div className="md:text-[24px] text-[18px] font-extrabold">
            Magna Partners
          </div>
        </a>
        <div className="hidden md:flex space-x-12">
          <a href="#organizations" className="cursor-pointer">
            Organizations
          </a>
          <a href="#partnership" className="cursor-pointer">
            Partnership
          </a>
          <a href="#contact" className="cursor-pointer">
            Contact
          </a>
        </div>
        <div
          className={`block md:hidden ham-menu ${burgerStatus ? "active" : ""}`}
          onClick={handleBurger}
        >
          <span></span>
          <span></span>
        </div>
        {burgerStatus && (
          <div className="flex flex-col bg-black w-48 h-40 rounded-xl absolute right-6 top-20 p-4 z-[99] space-y-[12px] md:hidden">
            <a
              href="#organizations"
              className="cursor-pointer"
              onClick={handleBurger}
            >
              Organizations
            </a>
            <a
              href="#partnership"
              className="cursor-pointer"
              onClick={handleBurger}
            >
              Partnership
            </a>
            <a
              href="#contact"
              className="cursor-pointer"
              onClick={handleBurger}
            >
              Contact
            </a>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div id="hero">
        <div className="flex flex-col items-center">
          <div className="relative min-w-screen h-auto px-5 md:px-[120px] pt-24">
            <div className="absolute bottom-0 -z-10 h-full w-full -mx-5 md:-mx-[120px]">
              <img
                src="/assets/img/magna-hero-background.webp"
                alt="background-section1"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-12 w-full">
              <h1 className="text-4xl md:text-7xl">
                <p className="mb-3">
                  We&apos;re <b>Magna</b>
                </p>
                <p>
                  Greatness <span className="gilda-font">Start Here</span>
                </p>
              </h1>
              <p className="text-lg font-medium text-white/70">
                Magna Partners was established in 2024 as a collectively
                developed network of organizations and communities that focused
                on solving the problems of youths: high schoolers, college
                students, and young professionals, with various types of
                products and services.
              </p>
              <a className="flex gap-3 items-center" href="#contact">
                <p className="text-lg">Contact Us</p>
                <div className="border border-white/30 p-2 rounded-full">
                  <ArrowIcon height={14} width={14} />
                </div>
              </a>
              <video
                muted
                autoPlay
                loop
                disablePictureInPicture
                width={300}
                height={300}
                className="w-full h-full"
              >
                <source src="/assets/video/hero-video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Organizations Section */}
      <div id="organizations">
        <div className="py-[80px] px-5">
          <div className="text-center max-w-[730px] mx-auto space-y-[8px]">
            <p className="text-base lg:text-2xl font-semibold">About</p>
            <p className="text-2xl lg:text-5xl gilda-font">
              Magna Organizations
            </p>
            <p className="text-sm lg:text-base">
              Discover the diverse landscape of Magna Organizations, each
              dedicated to innovation and excellence in their respective fields.
            </p>
          </div>
          <div className="flex gap-2 md:gap-4 lg:gap-8 justify-center flex-wrap mt-10 max-w-full">
            {/* Render your About Cards; for example, mapping through AboutData */}
            <AboutCard abouts={AboutData} />
          </div>
        </div>
      </div>

      {/* Impact / Numbers Section */}
      <section className="text-center relative w-full z-0">
        <div className="absolute w-full h-full -z-10">
          <img
            src="/assets/img/impact-img.png"
            alt="Background Image"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
        <div className="md:px-[120px] px-5 py-[96px] flex flex-col items-center max-w-screen-2xl mx-auto">
          <div className="max-w-[730px]">
            <h2 className="flex flex-col font-semibold md:text-2xl space-y-2">
              <span>Why Leading Businesses</span>
              <span className="gilda-font font-normal md:text-5xl text-[24px]">
                Choose Magna Partners
              </span>
            </h2>
            <p className="mt-5 md:text-[20px]">
              These numbers are more than just figures, they represent our
              dedication to making a meaningful difference and driving progress.
              We continue to strive for excellence, aiming to create even
              greater impacts in the years to come.
            </p>
          </div>
          <div className="w-full mt-[33px] mx-20 flex flex-wrap px-7 lg:px-0 justify-between gap-5">
            <div className="flex justify-center lg:justify-between w-full gap-5 flex-wrap border border-white border-[0.5px] rounded-xl py-6 px-2 lg:px-[80px] bg-white/[8%]">
              <div className="flex flex-col items-center space-y-1 md:space-y-3">
                <h3 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
                  <CountUp
                    start={0}
                    end={37}
                    suffix="k+"
                    enableScrollSpy
                    scrollSpyOnce
                  >
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                </h3>
                <p className="text-xs md:text-base text-center max-w-[80px] md:max-w-fit">
                  Event Registrants
                </p>
              </div>
              <div className="flex flex-col items-center space-y-1 md:space-y-3">
                <h3 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
                  <CountUp
                    start={0}
                    end={200}
                    suffix="k+"
                    enableScrollSpy
                    scrollSpyOnce
                  >
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                </h3>
                <p className="text-xs md:text-base text-center max-w-[80px] md:max-w-fit">
                  Social Media Followers
                </p>
              </div>
              <div className="flex flex-col items-center space-y-1 md:space-y-3">
                <h3 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
                  <CountUp
                    start={0}
                    end={300}
                    suffix="+"
                    enableScrollSpy
                    scrollSpyOnce
                  >
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                </h3>
                <p className="text-xs md:text-base text-center max-w-[80px] md:max-w-fit">
                  Universities Reached
                </p>
              </div>
              <div className="flex flex-col items-center space-y-1 md:space-y-3">
                <h3 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
                  <CountUp
                    start={0}
                    end={500}
                    suffix="+"
                    enableScrollSpy
                    scrollSpyOnce
                  >
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                </h3>
                <p className="text-xs md:text-base text-center max-w-[80px] md:max-w-fit">
                  Partnerships
                </p>
              </div>
              <div className="flex flex-col items-center space-y-1 md:space-y-3">
                <h3 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
                  <CountUp
                    start={0}
                    end={30}
                    suffix="+"
                    enableScrollSpy
                    scrollSpyOnce
                  >
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                </h3>
                <p className="text-xs md:text-base text-center max-w-[80px] md:max-w-fit">
                  Company Partnerships
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership / Marquee Section */}
      <div id="partnership">
        <div className="flex flex-col items-center py-20 space-y-10">
          <div className="gilda-font text-2xl md:text-5xl">
            Our Collaborative Network
          </div>
          {loading ? null : (
            <div
              className="flex flex-col space-y-[16px] items-center w-full max-w-screen"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0, black 128px, black calc(100% - 128px), transparent 100%)",
              }}
            >
              <Marquee direction="left" speed={50}>
                <ul className="flex">
                  {logos.map((logo, index) => (
                    <li key={index} className="md:mx-4 mx-2">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="md:w-56 rounded-[12px] object-contain"
                        loading="lazy"
                        style={{ height: "auto" }}
                        srcSet={`${logo.src} 1x, ${logo.src.replace(
                          ".webp",
                          "@2x.webp"
                        )} 2x`}
                      />
                    </li>
                  ))}
                </ul>
              </Marquee>
              <Marquee direction="right" speed={50}>
                <ul className="flex">
                  {logos2.map((logo, index) => (
                    <li key={index} className="md:mx-4 mx-2">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="md:w-56 rounded-[12px] object-contain"
                        loading="lazy"
                        style={{ height: "auto" }}
                        srcSet={`${logo.src} 1x, ${logo.src.replace(
                          ".webp",
                          "@2x.webp"
                        )} 2x`}
                      />
                    </li>
                  ))}
                </ul>
              </Marquee>
            </div>
          )}
        </div>
      </div>

      {/* Founder Message Section */}
      <div id="founder">
        <div className="w-full max-w-full px-5 md:px-[120px] pt-[36px] pb-[96px]">
          <div className="flex items-center justify-center">
            <div className="w-full md:w-[1200px] flex flex-col text-center items-center justify-center">
              <div className="h-auto md:h-[92px] flex flex-col gap-[8px]">
                <p className="text-2xl md:text-3xl lg:text-5xl gilda-font">
                  Message From The Founder
                </p>
              </div>
              <div className="flex flex-col gap-2 md:gap-2.5 lg:gap-[26px] md:mt-0 mt-[24px] space-y-[26px] md:space-y-0">
                <p className="text-base pt-2">
                  "At Magna Partners, we see every young Indonesian not just as
                  a participant in our nation&apos;s future, but as the driving
                  force behind it. We are committed to unlocking the boundless
                  potential within each youth, transforming them into visionary
                  leaders and innovators. Through our support and guidance, we
                  don&apos;t just shape contributors; we cultivate the
                  architects of Indonesia&apos;s bright and prosperous
                  tomorrow."
                </p>
                <p className="text-base font-bold">
                  Micah Davis - Co-founder and Strategic Advisor
                </p>
              </div>
              <div className="flex items-center px-[29px] py-[13px] h-[50px] rounded-3xl border border-white md:mt-5 mt-[24px]">
                <a
                  className="gilda-font"
                  href="https://www.linkedin.com/in/micahdavis141/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Know More About Micah
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div
        id="contact"
        className="footer-background flex flex-col items-center md:p-[80px] space-y-[40px] justify-center"
      >
        <div className="flex flex-col items-center text-[16px] text-center">
          <div className="md:text-[24px] text-[16px]">Contact Us</div>
          <div className="gilda-font md:text-[48px] text-[32px]">
            Stay connected with Magna Partners!
          </div>
        </div>
        <div className="flex gap-y-6 md:gap-x-[60px] gap-x-[25px]">
          <a
            className="flex md:space-x-3 space-x-0 items-center"
            href="https://www.instagram.com/magna.partners/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="md:flex hidden items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
              <InstaIcon size={15} color="white" />
            </div>
            <div
              className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
              aria-label="Magna Partners Instagram"
            >
              <InstaIcon size={25} color="white" />
            </div>
            <div className="md:flex hidden">@magna.partners</div>
          </a>
          <a
            className="flex md:space-x-3 space-x-0 items-center"
            href="mailto:magnainitiatives.id@gmail.com"
          >
            <div className="md:flex hidden items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
              <MailIcon size={15} color="white" />
            </div>
            <div
              className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
              aria-label="Magna Partners Email"
            >
              <MailIcon size={25} color="white" />
            </div>
            <div className="md:flex hidden">magnainitiatives.id@gmail.com</div>
          </a>
          <a
            className="flex md:space-x-3 space-x-0 items-center"
            href="https://www.linkedin.com/company/magna-id/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="md:flex hidden items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
              <LinkedinIcon size={15} color="white" />
            </div>
            <div
              className="flex md:hidden items-center justify-center rounded-full border border-white w-[50px] h-[50px]"
              aria-label="Magna Partners LinkedIn"
            >
              <LinkedinIcon size={25} color="white" />
            </div>
            <div className="md:flex hidden">Magna Partners</div>
          </a>
        </div>
      </div>
    </main>
  );
}

export default App;
