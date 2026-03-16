export const createOrderSlice = (set, get) => ({
  orders: [],

  addOrder: (orderData) => {
    const { orders } = get();
    // Validate required fields (assumes the component validated them before calling)
    set({ orders: [orderData, ...orders] });
  },

  getOrderById: (orderId) => {
    const { orders } = get();
    return orders.find(o => o.id === orderId) || null;
  },

  getUserOrders: (userId) => {
    const { orders } = get();
    return orders.filter(o => o.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
});
