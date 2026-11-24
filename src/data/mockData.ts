import type { Product, QuizQuestion } from "../types";
import SalmonImage from "../assets/images/food-salmon.png";
import ChickenImage from "../assets/images/food-chicken.png";
import TunaImage from "../assets/images/food-tuna.png";
import DuckImage from "../assets/images/food-duck.png";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Wild Salmon Paté",
    description:
      "Silky salmon paté crafted to boost daily hydration and delight picky cats.",
    price: 3.2,
    moisture: 78,
    protein: 11.5,
    calories: 85,
    tags: ["Wet Food", "Omega-3", "Grain-Free"],
    image: SalmonImage,
    ingredients: [
      "Wild Catch Salmon",
      "Salmon Broth",
      "Chicken Liver",
      "Taurine",
      "Vitamin E",
    ],
    reviews: [
      {
        id: "rev-101",
        user: "Sarah K.",
        rating: 5,
        comment:
          "My picky cat cleans the bowl every time with zero hesitation.",
      },
      {
        id: "rev-102",
        user: "David M.",
        rating: 4.8,
        comment: "Smooth texture and a great way to add extra daily moisture.",
      },
    ],
  },
  {
    id: "prod-2",
    name: "Free-Run Chicken",
    description:
      "Tender shredded chicken in savory broth made for active everyday meals.",
    price: 2.8,
    moisture: 76,
    protein: 13.0,
    calories: 92,
    tags: ["Wet Food", "High Protein", "Kitten Safe"],
    image: ChickenImage,
    ingredients: [
      "Free-Run Chicken",
      "Chicken Broth",
      "Pumpkin Purée",
      "Taurine",
      "Zinc Sulfate",
    ],
    reviews: [
      {
        id: "rev-201",
        user: "Emily R.",
        rating: 5,
        comment:
          "Clean ingredient list and great protein balance for my kitten.",
      },
      {
        id: "rev-202",
        user: "Jason W.",
        rating: 4.9,
        comment:
          "Shredded texture looks fresh and keeps energy steady all day.",
      },
    ],
  },
  {
    id: "prod-3",
    name: "Line-Caught Tuna",
    description:
      "Light flaky tuna in rich broth designed for high hydration and easy eating.",
    price: 2.5,
    moisture: 82,
    protein: 10.0,
    calories: 72,
    tags: ["Pouch", "Low Cal", "Sensitive Stomach"],
    image: TunaImage,
    ingredients: [
      "Line-Caught Tuna",
      "Tuna Broth",
      "Tapioca Starch",
      "Taurine",
      "Vitamin E",
    ],
    reviews: [
      {
        id: "rev-301",
        user: "Alex T.",
        rating: 5,
        comment:
          "High moisture content makes it easy to keep my cat well hydrated.",
      },
      {
        id: "rev-302",
        user: "Hannah C.",
        rating: 4.8,
        comment: "Light on calories and gentle on my cat's sensitive stomach.",
      },
    ],
  },
  {
    id: "prod-4",
    name: "Farm-Raised Duck",
    description:
      "Single-protein duck recipe balanced for delicate digestion and steady taste.",
    price: 3.5,
    moisture: 74,
    protein: 12.0,
    calories: 95,
    tags: ["Pouch", "Limited Ingredient", "Hypoallergenic"],
    image: DuckImage,
    ingredients: [
      "Farm-Raised Duck",
      "Duck Broth",
      "Sweet Potato",
      "Taurine",
      "Choline Chloride",
    ],
    reviews: [
      {
        id: "rev-401",
        user: "Jessica L.",
        rating: 5,
        comment:
          "Works wonderfully for food sensitivities with zero upset stomach.",
      },
      {
        id: "rev-402",
        user: "Ryan P.",
        rating: 4.9,
        comment: "Rich flavor that even hesitant eaters warm up to quickly.",
      },
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How much water does your cat drink each day?",
    subtitle:
      "Cats are desert animals and often underhydrate on dry food alone.",
    options: [
      "Barely touches the bowl",
      "A little now and then",
      "Drinks plenty",
    ],
  },
  {
    id: 2,
    question: "What does your cat eat most often right now?",
    subtitle: "Moisture content varies a lot between wet and dry food.",
    options: ["Mostly dry kibble", "A mix of wet & dry", "Mostly wet food"],
  },
  {
    id: 3,
    question: "How would you describe your cat's energy?",
    subtitle: "This helps us tune calories and protein for their lifestyle.",
    options: ["Loves to lounge", "Playful in bursts", "Always on the move"],
  },
];

export const FREE_SHIPPING_THRESHOLD: number = 25;
