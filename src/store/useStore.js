import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { createAuthSlice } from './slices/authSlice';
import { createProductSlice } from './slices/productSlice';
import { createCartSlice } from './slices/cartSlice';
import { createOrderSlice } from './slices/orderSlice';
import { createBoardSlice } from './slices/boardSlice';
import { createWishlistSlice } from './slices/wishlistSlice';

export const useStore = create(
  persist(
    (set, get) => ({
      ...createAuthSlice(set, get),
      ...createProductSlice(set, get),
      ...createCartSlice(set, get),
      ...createOrderSlice(set, get),
      ...createBoardSlice(set, get),
      ...createWishlistSlice(set, get),
    }),
    {
      name: 'ff-storage', // Require key according to project spec
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        users: state.users,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        products: state.products,
        cartItems: state.cartItems,
        inquiries: state.inquiries,
        qnas: state.qnas,
        orders: state.orders,
        wishlist: state.wishlist,
      }),
    }
  )
);
