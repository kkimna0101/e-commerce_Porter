export const createWishlistSlice = (set, get) => ({
  wishlist: [],

  toggleWishlist: (userId, product) => {
    const { wishlist } = get();
    const existingIndex = wishlist.findIndex(
      w => w.userId === userId && w.product.id === product.id
    );

    if (existingIndex >= 0) {
      set({
        wishlist: wishlist.filter((_, index) => index !== existingIndex)
      });
      return false; // removed
    } else {
      set({
        wishlist: [{ userId, product, addedAt: new Date().toISOString() }, ...wishlist]
      });
      return true; // added
    }
  },

  getUserWishlist: (userId) => {
    const { wishlist } = get();
    return wishlist.filter(w => w.userId === userId);
  },

  isProductWishlisted: (userId, productId) => {
    const { wishlist } = get();
    return wishlist.some(w => w.userId === userId && w.product.id === productId);
  }
});
