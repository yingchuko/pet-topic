import { create } from "zustand";
import type { Product, CartItem } from "../types";

// 1. 定義 State 的介面規範
interface AppState {
  // --- 狀態數據 (Data States) ---
  cart: CartItem[];
  isCartOpen: boolean;
  quizAnswers: Record<number, number>; // key: 問題的 Index, value: 選項的 Index

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

// 2. 建立 Zustand Store
export const useStore = create<AppState>((set, get) => ({
  // --- 初期狀態 ---
  cart: [],
  isCartOpen: false,
  quizAnswers: {},

  // --- 計算屬性 Getter ---
  // 即時計算購物車內所有商品的數量總和
  getTotalItems: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  },

  // --- 購物車 Actions 邏輯 ---

  // 加入購物車：若已存在則累加數量；若無則新增，並自動打開購物車抽屜
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) => item.product.id === product.id,
      );

      // 判斷購物車是否已存在此商品。
      // 找到商品時會回傳該商品在陣列中的位置索引（0, 1, 2...）找不到商品時則會回傳 -1。
      if (existingIndex > -1) {
        const newCart = [...state.cart]; // 建立全新的購物車，更新商品數量
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity,
        };
        return { cart: newCart, isCartOpen: true };
      }

      return {
        cart: [...state.cart, { product, quantity }], // 建立全新的購物車，原商品＋新商品
        isCartOpen: true,
      };
    }),

  // 先更新數量，再移除無效的項目
  // 更新商品數量：delta 為 +1 或 -1，若數量降為 0 以下則自動從購物車移除
  updateQuantity: (productId, delta) =>
    set((state) => ({
      cart: state.cart
        .map((item) => {
          // 找到需更新的目標商品
          if (item.product.id === productId) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })

        // 無法在 .map() 時移除，因為 .map() 是「一對一轉換」，它無法改變陣列的總長度
        // .map() 產生的陣列型別是：(CartItem | null)[]
        // 經過普通 filter 過濾：const filtered = mapped.filter(item => item !== null);
        // TypeScript 依然會把 filtered 推導為：(CartItem | null)[]

        // 利用 Type Predicate 自訂過濾函數中的「語意化型別斷言」
        // 只要這個函式回傳 true 就把該項目的型別鎖定為 CartItem，將 null 從型別組合中徹底抹除
        .filter((item): item is CartItem => item !== null),
    })),

  // 從購物車移除單一商品
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),

  // 切換購物車抽屜開關狀態（用於「Cart Icon Button」的相對切換）
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  // 明確設定購物車抽屜開關（用於「關閉按鈕」、「點擊遮罩背景」、「加入購物車」的絕對指定）
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

  // --- 測驗 Actions 邏輯 ---

  // 記錄測驗回答
  setQuizAnswer: (questionId, optionIndex) =>
    set((state) => ({
      quizAnswers: { ...state.quizAnswers, [questionId]: optionIndex },
    })),

  // 重置測驗
  resetQuiz: () => set({ quizAnswers: {} }),
}));
