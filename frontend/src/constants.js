export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
import {
  benefitImage2,
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
    title: "Libary",
    url: "#libary",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },

  {
    id: "3",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "4",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
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
    features: ["4 stories per month", "3 image per story"],
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

export const benefits = [
  {
    id: "0",
    title: " The Siamese Cat Who Lived Forever",
    text: "Once upon a time, there was a magical Siamese cat named Loki. He had beautiful blue eyes and long white fur that seemed to sparkle in the sun. Everyone who saw him commented on his majestic beauty and sweet personality.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Molly and the Elephant with a Thorn in His Foot",
    text: "Molly was a very quiet and shy little girl who loved spending time with animals. One day, she heard a loud and pained trumpet coming from the forest near her home. She immediately knew it had to be an elephant, so she ventured into the forest to investigate.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    imageUrl: "./src/assets/benefits/3.jpeg",
    light: true,
  },
  {
    id: "2",
    title:
      "Poppy and Sky Lou's Introduction to String Theory: An Exciting STEM Adventure!",
    text: "Once upon a time there were two 3 year old girls named Poppy and Sky Lou that were excited about STEM in general. One night when Poppy and Sky Lou were getting ready for bed, they asked their parents if they could hear a story about science.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    imageUrl: "./src/assets/benefits/1.jpeg",
  },
  {
    id: "3",
    title: "Fast responding",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Ask anything",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Improve everyday",
    text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    imageUrl: benefitImage2,
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
