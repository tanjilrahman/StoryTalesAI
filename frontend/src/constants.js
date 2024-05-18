export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
import {
  chromecast,
  disc02,
  discordBlack,
  facebook,
  file02,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  plusSquare,
  recording01,
  recording03,
  searchMd,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "./assets";

export const navigation = [
  {
    id: "0",
    title: "Story",
    url: "/story",
  },
  {
    id: "1",
    title: "Library",
    url: "/library",
  },
  {
    id: "2",
    title: "Discover",
    url: "/discover",
  },
  {
    id: "3",
    title: "Pricing",
    url: "/pricing",
  },

  {
    id: "4",
    title: "Create account",
    url: "/register",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "/login",
    onlyMobile: true,
  },
  {
    id: "6",
    title: "Logout",
    url: "/logout",
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const pricing = [
  {
    id: "0",
    title: "Free",
    description:
      "Your very own bedtime story author by your side, from only...",
    price: "0",
    features: ["4 stories per month", "3 images per story"],
  },
  {
    id: "1",
    title: "Basic",
    description:
      "Your very own bedtime story author by your side, from only...",
    price: "29",
    features: [
      "20 stories per month",
      "3 images per story",
      "Priority support to solve issues quickly",
      "Own the rights to stories & images",
    ],
  },
  {
    id: "2",
    title: "Premium",
    description:
      "Your very own bedtime story author by your side, from only...",
    price: "59",
    features: [
      "30 stories per month",
      "4 images per story",
      "3 super stories per month",
      "Profile/stories in Private Mode",
      "Own the rights to stories & images",
      "Priority support to solve issues quickly",
    ],
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
