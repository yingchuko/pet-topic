import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, ArrowRight } from "lucide-react";
import { useStore } from "../store/useStore";
import { QUIZ_QUESTIONS } from "../data/mockData";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { ProgressBar } from "./ui/ProgressBar";

export const QuizCard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { quizAnswers, setQuizAnswer, resetQuiz } = useStore();

  const currentQuestion = QUIZ_QUESTIONS[currentStep] || QUIZ_QUESTIONS[0];
  const totalQuestions = 3;
  const isCompleted = currentStep >= totalQuestions;
  const progressPercent = isCompleted
    ? 100
    : Math.round((currentStep / totalQuestions) * 100);

  const handleSelectOption = (index: number) => {
    setQuizAnswer(currentQuestion.id, index);
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleRestart = () => {
    resetQuiz();
    setCurrentStep(0);
  };

  return (
    <section id="quiz" className="container-layout py-12">
      {/* 標題 */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="section-title">Let's find the right plan</h2>
        <p className="section-subtitle">
          A quick 3-question check on your cat's hydration & nutrition.
        </p>
      </div>

      {/* 測驗卡片 */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>
                {isCompleted
                  ? "Complete"
                  : `Question ${currentStep + 1}/${totalQuestions}`}
              </span>
              <span className="text-orange font-extrabold">
                {progressPercent}%
              </span>
            </div>

            {/* 進度條 */}
            <ProgressBar progress={progressPercent} />
          </div>

          <AnimatePresence mode="wait">
            {!isCompleted ? (
              /* 未完成頁 */
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* 題目 */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {currentQuestion.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                    {currentQuestion.subtitle}
                  </p>
                </div>

                {/* 選項 */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = quizAnswers[currentQuestion.id] === idx;
                    return (
                      <Button
                        key={idx}
                        variant="option"
                        selected={isSelected}
                        onClick={() => handleSelectOption(idx)}
                      >
                        <span className="text-sm">{option}</span>

                        {/* 右側 Radio */}
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-orange bg-orange text-white"
                              : "border-slate-300 bg-transparent"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          )}
                        </div>
                      </Button>
                    );
                  })}
                </div>

                <Button
                  onClick={handleNext}
                  disabled={quizAnswers[currentQuestion.id] === undefined}
                  variant="primary"
                  size="lg"
                  className="!w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next question
                </Button>
              </motion.div>
            ) : (
              /* 完成頁 */
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="w-14 h-14 bg-orange-100/80 rounded-full flex items-center justify-center mx-auto text-orange">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>

                {/* 敘述 */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-slate-900">
                    Your hydration plan is ready!
                  </h3>
                  <p className="section-subtitle max-w-md mx-auto">
                    Based on your answers, we recommend leaning into
                    moisture-rich wet meals. Scroll down to see the picks we
                    matched for your cat.
                  </p>
                </div>

                {/* 按鈕組 */}
                <div className="flex flex-row gap-3 justify-center pt-2">
                  <Button
                    href="#shop"
                    variant="primary"
                    size="md"
                    className="gap-2"
                  >
                    See recommendations
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    onClick={handleRestart}
                    variant="secondary"
                    size="md"
                    className="gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retake
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
};
