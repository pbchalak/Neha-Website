export type PlantCategory = 
  | 'Flowering Plants'
  | 'Fruit Plants'
  | 'Medicinal Plants'
  | 'Ornamental Plants'
  | 'Vegetable Seedlings'
  | 'Gardening Essentials';

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: PlantCategory;
  shortDescription: string;
  fullDescription: string;
  price: number;
  stockQuantity: number;
  isAvailable: boolean;
  image: string;
  fallbackGradient?: string;
  sunlight: 'Full Sun' | 'Partial Sun / Shade' | 'Bright Indirect Light' | 'Low to Medium Light';
  watering: 'Daily' | 'Moderate (When topsoil is dry)' | 'Low (Drought tolerant)' | 'Deep watering weekly';
  suitableSoil: string;
  fertilizer: string;
  careInstructions: string[];
  featured?: boolean;
  idealSeason?: string;
  difficulty?: 'Beginner' | 'Moderate' | 'Advanced';
}

export interface GardeningProduct {
  id: string;
  name: string;
  category: 'Gardening Essentials';
  shortDescription: string;
  price: number;
  stockQuantity: number;
  isAvailable: boolean;
  image: string;
  unit: string;
  usageTips: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  unit?: string;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  city: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'Cash on Delivery' | 'UPI' | 'Card' | 'Net Banking';
  paymentStatus: 'Paid' | 'Pending (COD)';
  orderStatus: 'Pending' | 'Preparing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  createdAt: string;
  notes?: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  suppliedCategories: string[];
  location: string;
  activeContracts: number;
}

export interface IncomingSupplyBatch {
  id: string;
  batchNumber: string;
  supplierName: string;
  plantOrItemName: string;
  quantityReceived: number;
  dateReceived: string;
  unitCost: number;
  conditionNotes: string;
  verifiedBy: string;
}

export interface CareGuideItem {
  id: string;
  title: string;
  iconName: string;
  overview: string;
  keyPractices: string[];
  commonMistakes: string[];
  seasonalAdvice: string;
}

export interface PestGuideItem {
  name: string;
  symptoms: string;
  affectedPlants: string;
  organicRemedy: string;
  preventiveAction: string;
}
