import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { QuizCard } from "./components/QuizCard";
import { NutritionChart } from "./components/NutritionChart";

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-slate-800 selection:bg-orange-200">
      <Header />
      <main className="space-y-8">
        <Hero />
        <QuizCard />
        <NutritionChart />
      </main>
    </div>
  );
}
