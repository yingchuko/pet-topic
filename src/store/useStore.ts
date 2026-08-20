import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, CartItem } from "../types";

// 1. 定義 State 介面規範
interface AppState {
  // --- 狀態數據 (Data States) ---
  cart: CartItem[];
  isCartOpen: boolean;
  quizAnswers: Record<number, number>;

  // --- 計算屬性 (Getters) ---
  getTotalItems: () => number;
  getSubtotal: () => number;

  // --- 操作方法 (Actions) ---
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  setQuizAnswer: (questionId: number, optionIndex: number) => void;
  resetQuiz: () => void;
}

// 2. 建立帶有 persist 機制的 Zustand Store
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // --- 初期狀態 ---
      cart: [],
      isCartOpen: false,
      quizAnswers: {},

      // --- 計算屬性 Getters ---
      getTotalItems: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().cart.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        );
      },

      // --- 購物車 Actions ---
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) => item.product.id === product.id,
          );

          if (existingIndex > -1) {
            const newCart = [...state.cart];
            newCart[existingIndex] = {
              ...newCart[existingIndex],
              quantity: newCart[existingIndex].quantity + quantity,
            };
            return { cart: newCart, isCartOpen: true };
          }

          return {
            cart: [...state.cart, { product, quantity }],
            isCartOpen: true,
          };
        }),

      updateQuantity: (productId, delta) =>
        set((state) => ({
          cart: state.cart
            .map((item) => {
              if (item.product.id === productId) {
                const newQuantity = item.quantity + delta;
                return newQuantity > 0
                  ? { ...item, quantity: newQuantity }
                  : null;
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null),
        })),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      setQuizAnswer: (questionId, optionIndex) =>
        set((state) => ({
          quizAnswers: { ...state.quizAnswers, [questionId]: optionIndex },
        })),

      resetQuiz: () => set({ quizAnswers: {} }),
    }),
    {
      name: "cart", // localStorage 中的 key 名稱
      storage: createJSONStorage(() => localStorage), // 指定儲存媒介為 localStorage

      /**
       * partialize 白名單過濾
       * 指定僅將 `cart` 寫入 localStorage。
       * isCartOpen 與 quizAnswers 不在回傳物件中，因此重新整理時不會寫入/讀取。
       */
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);
