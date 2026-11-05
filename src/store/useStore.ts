import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, CartItem, UserProfile, Order } from "../types";
import { MOCK_PRODUCTS } from "../data/mockData";

// 1. 定義 State 介面規範
interface AppState {
  // --- 狀態數據 (Data States) ---
  cart: CartItem[];
  isCartOpen: boolean;
  quizAnswers: Record<number, number>;
  selectedProduct: Product | null;
  user: UserProfile | null;
  orders: Order[];

  // --- 計算屬性 (Getters) ---
  getTotalItems: () => number;
  getSubtotal: () => number;
  getRecommendedProducts: () => Product[];

  // --- 操作方法 (Actions) ---
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  setQuizAnswer: (questionId: number, optionIndex: number) => void;
  resetQuiz: () => void;
  setSelectedProduct: (product: Product | null) => void;
  setUser: (user: UserProfile | null) => void;
  createOrder: (shippingAddress: string) => Order | null;
}

// 2. 建立帶有 persist 機制的 Zustand Store
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // --- 初期狀態 ---
      cart: [],
      isCartOpen: false,
      quizAnswers: {},
      selectedProduct: null,
      user: {
        id: "usr-01",
        name: "YingChu",
        email: "user@example.com",
        petName: "Mimi",
        petType: "cat",
        subscriptionStatus: "active",
      },
      orders: [],

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

      getRecommendedProducts: () => {
        const answers = get().quizAnswers;
        if (Object.keys(answers).length < 3) return MOCK_PRODUCTS;

        return [...MOCK_PRODUCTS].sort((a, b) => {
          let score = 0;
          if (answers[1] === 0 || answers[2] === 0)
            score += b.moisture - a.moisture;
          if (answers[3] === 2 && a.tags.includes("High Protein")) score -= 10;
          if (answers[3] === 2 && b.tags.includes("High Protein")) score += 10;
          return score;
        });
      },

      // --- Actions ---
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

      setSelectedProduct: (product) => set({ selectedProduct: product }),

      setUser: (user) => set({ user }),

      createOrder: (shippingAddress) => {
        const cart = get().cart;
        if (cart.length === 0) return null;

        const newOrder: Order = {
          id: `PT-${Date.now().toString().slice(-6)}`,
          items: [...cart],
          totalAmount: get().getSubtotal(),
          shippingAddress,
          createdAt: new Date().toISOString().split("T")[0],
          status: "processing",
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          cart: [],
          isCartOpen: false,
        }));

        return newOrder;
      },
    }),
    {
      name: "pettopic-storage",
      storage: createJSONStorage(() => localStorage),
      /**
       * partialize 白名單過濾
       * 僅持久化保存（localStorage）購物車、會員資料與歷史訂單。
       */
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        orders: state.orders,
      }),
    },
  ),
);
