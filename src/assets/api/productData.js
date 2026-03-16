export const productsData = [
  {
    id: 'p1',
    name: 'TANKER BACKPACK',
    brand: 'PORTER',
    category: 'Work',
    price: 388000,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: '오리지널 나일론 트윌 원단을 사용한 시그니처 백팩입니다.',
    isNew: true,
    isBest: true,
    isSale: false,
    gender: 'Man',
    stock: 50,
    colors: ['Black', 'Sage Green', 'Silver Gray'],
    sizes: ['Free'],
    specs: {
      material: 'Nylon Twill',
      weight: '550g',
      origin: 'Japan',
      care: 'Do not wash'
    },
    reviews: [
      { id: 1, user: 'testUser', date: '2026-03-10', rating: 5, content: '최고의 품질입니다.' }
    ]
  },
  {
    id: 'p2',
    name: '2WAY BOSTON BAG',
    brand: 'PORTER',
    category: 'Travel',
    price: 458000,
    discountPrice: 400000,
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: '여행에 적합한 넉넉한 수납공간을 자랑하는 보스턴 백입니다.',
    isNew: false,
    isBest: true,
    isSale: true,
    gender: 'Unisex',
    stock: 20,
    colors: ['Black', 'Navy'],
    sizes: ['Free'],
    specs: {
      material: 'Nylon Twill',
      weight: '800g',
      origin: 'Japan',
      care: 'Wipe with damp cloth'
    },
    reviews: []
  },
  {
    id: 'p3',
    name: 'SHOULDER BAG',
    brand: 'PORTER',
    category: 'Daily',
    price: 218000,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: '컴팩트한 사이즈의 데일리 숄더백입니다.',
    isNew: true,
    isBest: false,
    isSale: false,
    gender: 'Woman',
    stock: 100,
    colors: ['Black', 'Iron Blue'],
    sizes: ['Free'],
    specs: {
      material: 'Nylon',
      weight: '280g',
      origin: 'Japan',
      care: 'Do not wash'
    },
    reviews: []
  },
  {
    id: 'p4',
    name: 'WALLET',
    brand: 'PORTER',
    category: 'Small Goods',
    price: 118000,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: '수납력이 좋은 나일론 지갑입니다.',
    isNew: false,
    isBest: true,
    isSale: false,
    gender: 'Unisex',
    stock: 80,
    colors: ['Black'],
    sizes: ['Free'],
    specs: {
      material: 'Nylon Twill',
      weight: '110g',
      origin: 'Japan',
      care: 'Do not wash'
    },
    reviews: []
  }
];
