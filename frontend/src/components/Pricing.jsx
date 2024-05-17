import Section from "./Section";
import { smallSphere, stars } from "../assets";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { LeftLine, RightLine } from "./design/Pricing";
import { useLocation } from "react-router-dom";

const Pricing = () => {
  const location = useLocation();
  return (
    <Section className="overflow-hidden">
      <div className="container relative z-2">
        <div
          className={`${
            location.pathname === "/pricing"
              ? "hidden"
              : "hidden relative justify-center mb-[6.5rem] lg:flex"
          }`}
        >
          <img
            src={smallSphere}
            className="relative z-1"
            width={255}
            height={255}
            alt="Sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={stars}
              className="w-full"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>

        <Heading
          tag="Get started with Golpo.ai"
          title="Affordable Subscriptions"
        />

        <div className="relative" id="pricing">
          <PricingList />
          <LeftLine />
          <RightLine />
        </div>

        <div
          className={`${
            location.pathname === "/pricing"
              ? "hidden"
              : "flex justify-center mt-10"
          }`}
        >
          <a
            className="text-xs font-bold tracking-wider uppercase border-b font-code"
            href="/pricing"
          >
            See the full details
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
