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
      "Silky salmon paté that keeps picky cats sipping hydration with every bite.",
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
      "Essential Vitamins",
      "Taurine",
    ],
    reviews: [
      {
        id: "rev-101",
        user: "Sarah K.",
        rating: 5,
        comment: "My 4-year-old picky cat loves the silky texture!",
      },
      {
        id: "rev-102",
        user: "David M.",
        rating: 4.8,
        comment: "Great way to sneak extra water into his diet.",
      },
    ],
  },
  {
    id: "prod-2",
    name: "Free-Run Chicken",
    description:
      "Tender shredded chicken in gravy — an everyday favorite for growing kitties.",
    price: 2.8,
    moisture: 76,
    protein: 13.0,
    calories: 92,
    tags: ["Wet Food", "High Protein", "Kitten Safe"],
    image: ChickenImage,
    ingredients: [
      "Free-Run Chicken",
      "Chicken Bone Broth",
      "Pumpkin",
      "Minerals",
      "Taurine",
    ],
    reviews: [
      {
        id: "rev-201",
        user: "Emily R.",
        rating: 5,
        comment: "High protein and clean ingredient list. Highly recommend!",
      },
    ],
  },
  {
    id: "prod-3",
    name: "Line-Caught Tuna",
    description: "Flaky tuna in broth for maximum hydration and minimal fuss.",
    price: 2.5,
    moisture: 82,
    protein: 10.0,
    calories: 72,
    tags: ["Pouch", "Low Cal", "Sensitive Stomach"],
    image: TunaImage,
    ingredients: [
      "Line-Caught Skipjack Tuna",
      "Tuna Broth",
      "Vitamin E Supplement",
      "Fructooligosaccharide",
    ],
    reviews: [
      {
        id: "rev-301",
        user: "Alex T.",
        rating: 4.9,
        comment: "Extremely high moisture content, awesome for urinary care.",
      },
    ],
  },
  {
    id: "prod-4",
    name: "Farm-Raised Duck",
    description:
      "A novel-protein recipe crafted for cats with delicate digestion.",
    price: 3.5,
    moisture: 74,
    protein: 12.0,
    calories: 95,
    tags: ["Pouch", "Limited Ingredient"],
    image: DuckImage,
    ingredients: [
      "Farm-Raised Duck",
      "Duck Broth",
      "Tapioca Starch",
      "Zinc Sulfate",
      "Taurine",
    ],
    reviews: [
      {
        id: "rev-401",
        user: "Jessica L.",
        rating: 5,
        comment: "Perfect for my cat's food allergies. Zero stomach troubles!",
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
