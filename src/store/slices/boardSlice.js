import { noticesData, faqsData } from '../../assets/api/boardData';

export const createBoardSlice = (set, get) => ({
  notices: [],
  faqs: [],
  inquiries: [],
  qnas: [],

  fetchNotices: () => {
    set({ notices: noticesData });
  },

  fetchFAQs: (category = 'All') => {
    if (category === 'All') {
      set({ faqs: faqsData });
    } else {
      set({ faqs: faqsData.filter(faq => faq.category === category) });
    }
  },

  submitInquiry: (data) => {
    const { inquiries } = get();
    const newInquiry = {
      ...data,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    set({ inquiries: [newInquiry, ...inquiries] });
  },

  updateInquiry: (id, updateData) => {
    const { inquiries } = get();
    set({
      inquiries: inquiries.map(i => i.id === id ? { ...i, ...updateData } : i)
    });
  },

  deleteInquiry: (id) => {
    const { inquiries } = get();
    set({
      inquiries: inquiries.filter(i => i.id !== id)
    });
  },

  getUserInquiries: (userId) => {
    const { inquiries } = get();
    return inquiries.filter(i => i.userId === userId);
  },

  submitQna: (data) => {
    const { qnas } = get();
    const newQna = {
      ...data,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    set({ qnas: [newQna, ...qnas] });
  },

  updateQna: (id, updateData) => {
    const { qnas } = get();
    set({
      qnas: qnas.map(q => q.id === id ? { ...q, ...updateData } : q)
    });
  },

  deleteQna: (id) => {
    const { qnas } = get();
    set({
      qnas: qnas.filter(q => q.id !== id)
    });
  },

  getUserQnas: (userId) => {
    const { qnas } = get();
    return qnas.filter(q => q.userId === userId);
  }
});
