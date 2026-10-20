import { CustomerOrder, CustomerRecord, Supplier, IncomingSupplyBatch } from '../types';

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ORD-7041',
    customerName: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98450 12384',
    deliveryAddress: 'Flat 402, Green Meadows, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    items: [
      { id: 'plant-rose', name: 'Rose', price: 240, quantity: 2, image: '/src/assets/images/featured_rose_flowering_1792516247008.jpg', category: 'Flowering Plants' },
      { id: 'item-organic-compost', name: 'Organic Compost (Aged Nursery Blend)', price: 180, quantity: 1, image: '/src/assets/images/gardening_essentials_bench_1792516247206.jpg', category: 'Gardening Essentials', unit: '10 kg bag' }
    ],
    subtotal: 660,
    deliveryFee: 50,
    total: 710,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Dispatched',
    createdAt: '2026-10-18T14:32:00Z',
    notes: 'Please pack in sturdy cartons with ventilation holes.'
  },
  {
    id: 'ORD-7042',
    customerName: 'Vikramaditya Patel',
    email: 'v.patel@example.com',
    phone: '+91 97120 45612',
    deliveryAddress: '14, Sunrise Villas, Drive-in Road',
    city: 'Ahmedabad',
    pincode: '380054',
    items: [
      { id: 'plant-mango', name: 'Mango', price: 380, quantity: 2, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80', category: 'Fruit Plants' },
      { id: 'plant-lemon', name: 'Lemon', price: 220, quantity: 1, image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800&q=80', category: 'Fruit Plants' }
    ],
    subtotal: 980,
    deliveryFee: 70,
    total: 1050,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending (COD)',
    orderStatus: 'Preparing',
    createdAt: '2026-10-19T09:15:00Z',
    notes: 'Call before delivery.'
  },
  {
    id: 'ORD-7043',
    customerName: 'Pooja Iyer',
    email: 'pooja.iyer@example.com',
    phone: '+91 98201 98741',
    deliveryAddress: '8B, Palm Grove, Bandra West',
    city: 'Mumbai',
    pincode: '400050',
    items: [
      { id: 'plant-areca-palm', name: 'Areca Palm', price: 360, quantity: 1, image: '/src/assets/images/featured_indoor_ornamental_1792516248406.jpg', category: 'Ornamental Plants' },
      { id: 'plant-money-plant', name: 'Money Plant (Golden Pothos)', price: 130, quantity: 2, image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80', category: 'Ornamental Plants' },
      { id: 'item-terracotta-pots', name: 'Handcrafted Terracotta Pots Set', price: 380, quantity: 1, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80', category: 'Gardening Essentials' }
    ],
    subtotal: 1000,
    deliveryFee: 0,
    total: 1000,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: '2026-10-15T11:20:00Z',
    notes: 'Delivered safely.'
  },
  {
    id: 'ORD-7044',
    customerName: 'Rohan Deshmukh',
    email: 'rohan.d@example.com',
    phone: '+91 94220 81290',
    deliveryAddress: 'Plot 29, Model Colony, Shivaji Nagar',
    city: 'Pune',
    pincode: '411016',
    items: [
      { id: 'plant-tomato', name: 'Tomato Seedlings', price: 60, quantity: 5, image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80', category: 'Vegetable Seedlings' },
      { id: 'plant-chilli', name: 'Chilli Seedlings', price: 50, quantity: 4, image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80', category: 'Vegetable Seedlings' },
      { id: 'item-vermicompost', name: 'Pure Earthworm Vermicompost', price: 220, quantity: 2, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80', category: 'Gardening Essentials', unit: '5 kg bag' }
    ],
    subtotal: 940,
    deliveryFee: 60,
    total: 1000,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    createdAt: '2026-10-20T08:45:00Z'
  }
];

export const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'cust-101',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98450 12384',
    address: 'Indiranagar, Bengaluru, KA',
    totalOrders: 3,
    totalSpent: 2840,
    joinedDate: '2026-03-12'
  },
  {
    id: 'cust-102',
    name: 'Vikramaditya Patel',
    email: 'v.patel@example.com',
    phone: '+91 97120 45612',
    address: 'Drive-in Road, Ahmedabad, GJ',
    totalOrders: 2,
    totalSpent: 1920,
    joinedDate: '2026-05-18'
  },
  {
    id: 'cust-103',
    name: 'Pooja Iyer',
    email: 'pooja.iyer@example.com',
    phone: '+91 98201 98741',
    address: 'Bandra West, Mumbai, MH',
    totalOrders: 4,
    totalSpent: 4210,
    joinedDate: '2026-01-20'
  },
  {
    id: 'cust-104',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@example.com',
    phone: '+91 94220 81290',
    address: 'Shivaji Nagar, Pune, MH',
    totalOrders: 1,
    totalSpent: 1000,
    joinedDate: '2026-10-20'
  },
  {
    id: 'cust-105',
    name: 'Kavita Menon',
    email: 'kavita.menon@example.com',
    phone: '+91 99401 56210',
    address: 'Adyar, Chennai, TN',
    totalOrders: 5,
    totalSpent: 5690,
    joinedDate: '2025-11-04'
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Vedic Flora Breeders & Saplings',
    contactPerson: 'Suresh Gowda',
    phone: '+91 98451 77210',
    email: 'contact@vedicflora.in',
    suppliedCategories: ['Flowering Plants', 'Ornamental Plants'],
    location: 'Hoskote Nursery Cluster, Karnataka',
    activeContracts: 4
  },
  {
    id: 'sup-2',
    name: 'Deccan Agro Fruit Horticulturists',
    contactPerson: 'Manoj Jadhav',
    phone: '+91 98223 44109',
    email: 'supplies@deccanagro.org',
    suppliedCategories: ['Fruit Plants', 'Vegetable Seedlings'],
    location: 'Ratnagiri Orchards, Maharashtra',
    activeContracts: 3
  },
  {
    id: 'sup-3',
    name: 'Organic Earth & Bio-Compost Works',
    contactPerson: 'Sunita Rao',
    phone: '+91 97412 88901',
    email: 'earthworks@biocompost.co',
    suppliedCategories: ['Gardening Essentials'],
    location: 'Mysuru Farm Cluster, Karnataka',
    activeContracts: 2
  },
  {
    id: 'sup-4',
    name: 'AyurVriksh Herbal Botanical Nursery',
    contactPerson: 'Dr. Anand Joshi',
    phone: '+91 94481 22390',
    email: 'botany@ayurvriksh.com',
    suppliedCategories: ['Medicinal Plants'],
    location: 'Shivamogga Rainforest Reserve, Karnataka',
    activeContracts: 2
  }
];

export const INITIAL_INCOMING_BATCHES: IncomingSupplyBatch[] = [
  {
    id: 'BAT-2026-88',
    batchNumber: 'BATCH-FL-088',
    supplierName: 'Vedic Flora Breeders & Saplings',
    plantOrItemName: 'Rose (Hybrid Tea & Floribunda)',
    quantityReceived: 50,
    dateReceived: '2026-10-14',
    unitCost: 110,
    conditionNotes: 'Healthy grafted root systems, moisture intact, 0% mortality.',
    verifiedBy: 'Ramesh K. (Head Horticulturist)'
  },
  {
    id: 'BAT-2026-89',
    batchNumber: 'BATCH-FR-029',
    supplierName: 'Deccan Agro Fruit Horticulturists',
    plantOrItemName: 'Mango (Alphonso & Kesar Saplings)',
    quantityReceived: 30,
    dateReceived: '2026-10-16',
    unitCost: 190,
    conditionNotes: 'Sturdy graft junctions, vigorous green shoots.',
    verifiedBy: 'Sneha L. (Quality Inspector)'
  },
  {
    id: 'BAT-2026-90',
    batchNumber: 'BATCH-SO-112',
    supplierName: 'Organic Earth & Bio-Compost Works',
    plantOrItemName: 'Organic Compost (Aged Blend 10kg)',
    quantityReceived: 80,
    dateReceived: '2026-10-18',
    unitCost: 85,
    conditionNotes: 'Lab moisture test 22%, zero weed seeds.',
    verifiedBy: 'Ramesh K. (Head Horticulturist)'
  }
];

export const NURSERY_ADMIN_STAFF = [
  { id: 'adm-1', name: 'Ramesh Krishnan', role: 'Chief Horticulturist & Nursery Manager', email: 'ramesh@greengarden.com', accessLevel: 'Super Admin', status: 'Active' },
  { id: 'adm-2', name: 'Sneha Lavanya', role: 'Quality & Inventory Specialist', email: 'sneha@greengarden.com', accessLevel: 'Inventory & Dispatch', status: 'Active' },
  { id: 'adm-3', name: 'Karthik Verma', role: 'Logistics & Customer Relations', email: 'karthik@greengarden.com', accessLevel: 'Orders & Support', status: 'Active' }
];
