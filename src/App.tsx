import { Header } from "./components/Header";
import { Hero } from "./components/Hero";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-cream text-slate-800 selection:bg-orange-200">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
