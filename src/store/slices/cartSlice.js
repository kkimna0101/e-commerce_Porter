export const createCartSlice = (set, get) => ({
  cartItems: [],

  getSanitizedCart: () => {
    const { cartItems } = get();
    const sanitized = cartItems.map(item => {
      if (!item.cartId) {
        return {
          ...item,
          cartId: `${item.id}-${item.selectedColor || 'none'}-${item.selectedSize || 'none'}`
        };
      }
      return item;
    });
    set({ cartItems: sanitized });
  },

  addToCart: (product, quantity = 1) => {
    const { cartItems } = get();
    const cartId = `${product.id}-${product.selectedColor || 'none'}-${product.selectedSize || 'none'}`;
    const existingItem = cartItems.find(item => item.cartId === cartId);

    if (existingItem) {
      set({
        cartItems: cartItems.map(item => 
          item.cartId === cartId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
    } else {
      set({
        cartItems: [{ ...product, quantity, cartId }, ...cartItems]
      });
    }
  },

  updateCartQuantity: (cartId, quantity) => {
    const { cartItems } = get();
    if (quantity < 1) return;
    
    set({
      cartItems: cartItems.map(item => 
        item.cartId === cartId ? { ...item, quantity } : item
      )
    });
  },

  removeFromCart: (cartId) => {
    const { cartItems } = get();
    set({
      cartItems: cartItems.filter(item => item.cartId !== cartId)
    });
  },

  removeMultipleFromCart: (cartIds) => {
    const { cartItems } = get();
    set({
      cartItems: cartItems.filter(item => !cartIds.includes(item.cartId))
    });
  },

  clearCart: () => {
    set({ cartItems: [] });
  },

  getTotalItems: () => {
    const { cartItems } = get();
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }
});
