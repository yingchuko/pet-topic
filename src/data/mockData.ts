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
    tags: ["Wet Food", "Omega-3", "Grain-Free"],
    image: SalmonImage,
  },
  {
    id: "prod-2",
    name: "Free-Run Chicken",
    description:
      "Tender shredded chicken in gravy — an everyday favorite for growing kitties.",
    price: 2.8,
    moisture: 76,
    tags: ["Wet Food", "High Protein", "Kitten Safe"],
    image: ChickenImage,
  },
  {
    id: "prod-3",
    name: "Line-Caught Tuna",
    description: "Flaky tuna in broth for maximum hydration and minimal fuss.",
    price: 2.5,
    moisture: 82,
    tags: ["Pouch", "Low Cal", "Sensitive Stomach"],
    image: TunaImage,
  },
  {
    id: "prod-4",
    name: "Farm-Raised Duck",
    description:
      "A novel-protein recipe crafted for cats with delicate digestion.",
    price: 3.5,
    moisture: 74,
    tags: ["Pouch", "Limited Ingredient", "Hypoallergenic"],
    image: DuckImage,
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
