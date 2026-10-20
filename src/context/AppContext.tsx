import React, { createContext, useContext, useState, useEffect } from 'react';
import { Plant, GardeningProduct, CartItem, CustomerOrder, CustomerRecord, Supplier, IncomingSupplyBatch } from '../types';
import { INITIAL_PLANTS, INITIAL_GARDENING_PRODUCTS } from '../data/plants';
import { INITIAL_ORDERS, INITIAL_CUSTOMERS, INITIAL_SUPPLIERS, INITIAL_INCOMING_BATCHES } from '../data/mockAdminData';

interface AppContextType {
  plants: Plant[];
  gardeningProducts: GardeningProduct[];
  cart: CartItem[];
  orders: CustomerOrder[];
  customers: CustomerRecord[];
  suppliers: Supplier[];
  incomingBatches: IncomingSupplyBatch[];
  
  // Navigation & Modals
  currentView: 'storefront' | 'admin';
  setCurrentView: (view: 'storefront' | 'admin') => void;
  selectedPlant: Plant | null;
  setSelectedPlant: (plant: Plant | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isEnquiryOpen: boolean;
  setIsEnquiryOpen: (open: boolean) => void;
  enquiryTarget: string;
  setEnquiryTarget: (target: string) => void;
  confirmedOrder: CustomerOrder | null;
  setConfirmedOrder: (order: CustomerOrder | null) => void;
  activePolicy: string | null;
  setActivePolicy: (policy: string | null) => void;

  // Cart actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;

  // Order & Checkout
  createOrder: (orderData: {
    customerName: string;
    email: string;
    phone: string;
    deliveryAddress: string;
    city: string;
    pincode: string;
    paymentMethod: 'Cash on Delivery' | 'UPI' | 'Card' | 'Net Banking';
    notes?: string;
  }) => CustomerOrder;

  // Admin Actions
  updateOrderStatus: (orderId: string, status: CustomerOrder['orderStatus']) => void;
  updatePlant: (plant: Plant) => void;
  addPlant: (plant: Omit<Plant, 'id'>) => void;
  adjustPlantStock: (plantId: string, newStock: number) => void;
  addIncomingBatch: (batch: Omit<IncomingSupplyBatch, 'id'>) => void;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  resetAllDataToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage initialization with fallbacks
  const [plants, setPlants] = useState<Plant[]>(() => {
    const saved = localStorage.getItem('greengarden_plants');
    return saved ? JSON.parse(saved) : INITIAL_PLANTS;
  });

  const [gardeningProducts, setGardeningProducts] = useState<GardeningProduct[]>(() => {
    const saved = localStorage.getItem('greengarden_products');
    return saved ? JSON.parse(saved) : INITIAL_GARDENING_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('greengarden_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    const saved = localStorage.getItem('greengarden_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [customers, setCustomers] = useState<CustomerRecord[]>(() => {
    const saved = localStorage.getItem('greengarden_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem('greengarden_suppliers');
    return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
  });

  const [incomingBatches, setIncomingBatches] = useState<IncomingSupplyBatch[]>(() => {
    const saved = localStorage.getItem('greengarden_batches');
    return saved ? JSON.parse(saved) : INITIAL_INCOMING_BATCHES;
  });

  // UI state
  const [currentView, setCurrentView] = useState<'storefront' | 'admin'>('storefront');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [enquiryTarget, setEnquiryTarget] = useState<string>('General Enquiry');
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);
  const [activePolicy, setActivePolicy] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('greengarden_plants', JSON.stringify(plants));
  }, [plants]);

  useEffect(() => {
    localStorage.setItem('greengarden_products', JSON.stringify(gardeningProducts));
  }, [gardeningProducts]);

  useEffect(() => {
    localStorage.setItem('greengarden_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('greengarden_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('greengarden_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('greengarden_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('greengarden_batches', JSON.stringify(incomingBatches));
  }, [incomingBatches]);

  // Cart computations
  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const updated = item.quantity + delta;
            return updated > 0 ? { ...item, quantity: updated } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Create real order & update inventory stock
  const createOrder = (orderData: {
    customerName: string;
    email: string;
    phone: string;
    deliveryAddress: string;
    city: string;
    pincode: string;
    paymentMethod: 'Cash on Delivery' | 'UPI' | 'Card' | 'Net Banking';
    notes?: string;
  }): CustomerOrder => {
    const subtotal = cartSubtotal;
    const deliveryFee = subtotal > 799 ? 0 : 50;
    const total = subtotal + deliveryFee;

    const newOrder: CustomerOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      deliveryAddress: orderData.deliveryAddress,
      city: orderData.city,
      pincode: orderData.pincode,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending (COD)' : 'Paid',
      orderStatus: 'Pending',
      createdAt: new Date().toISOString(),
      notes: orderData.notes
    };

    // Update orders list
    setOrders((prev) => [newOrder, ...prev]);

    // Update customer records or insert new
    setCustomers((prev) => {
      const existing = prev.find((c) => c.email.toLowerCase() === orderData.email.toLowerCase());
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? { ...c, totalOrders: c.totalOrders + 1, totalSpent: c.totalSpent + total }
            : c
        );
      } else {
        const newCust: CustomerRecord = {
          id: `cust-${Date.now().toString().slice(-4)}`,
          name: orderData.customerName,
          email: orderData.email,
          phone: orderData.phone,
          address: `${orderData.deliveryAddress}, ${orderData.city}`,
          totalOrders: 1,
          totalSpent: total,
          joinedDate: new Date().toISOString().split('T')[0]
        };
        return [newCust, ...prev];
      }
    });

    // Reduce stock for purchased plants
    setPlants((prevPlants) => {
      return prevPlants.map((plant) => {
        const cartMatch = cart.find((c) => c.id === plant.id);
        if (cartMatch) {
          const updatedStock = Math.max(0, plant.stockQuantity - cartMatch.quantity);
          return {
            ...plant,
            stockQuantity: updatedStock,
            isAvailable: updatedStock > 0
          };
        }
        return plant;
      });
    });

    // Reduce stock for gardening products if any
    setGardeningProducts((prevProds) => {
      return prevProds.map((prod) => {
        const cartMatch = cart.find((c) => c.id === prod.id);
        if (cartMatch) {
          const updatedStock = Math.max(0, prod.stockQuantity - cartMatch.quantity);
          return {
            ...prod,
            stockQuantity: updatedStock,
            isAvailable: updatedStock > 0
          };
        }
        return prod;
      });
    });

    clearCart();
    setConfirmedOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: CustomerOrder['orderStatus']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, orderStatus: status } : order))
    );
  };

  const updatePlant = (updatedPlant: Plant) => {
    setPlants((prev) => prev.map((p) => (p.id === updatedPlant.id ? updatedPlant : p)));
  };

  const addPlant = (newPlantData: Omit<Plant, 'id'>) => {
    const newPlant: Plant = {
      ...newPlantData,
      id: `plant-${Date.now()}`
    };
    setPlants((prev) => [newPlant, ...prev]);
  };

  const adjustPlantStock = (plantId: string, newStock: number) => {
    setPlants((prev) =>
      prev.map((p) =>
        p.id === plantId
          ? { ...p, stockQuantity: newStock, isAvailable: newStock > 0 }
          : p
      )
    );
  };

  const addIncomingBatch = (batchData: Omit<IncomingSupplyBatch, 'id'>) => {
    const newBatch: IncomingSupplyBatch = {
      ...batchData,
      id: `BAT-${Date.now().toString().slice(-4)}`
    };
    setIncomingBatches((prev) => [newBatch, ...prev]);

    // Automatically increase matching plant stock if names match
    setPlants((prev) =>
      prev.map((p) => {
        if (batchData.plantOrItemName.toLowerCase().includes(p.name.toLowerCase())) {
          return {
            ...p,
            stockQuantity: p.stockQuantity + batchData.quantityReceived,
            isAvailable: true
          };
        }
        return p;
      })
    );
  };

  const addSupplier = (supplierData: Omit<Supplier, 'id'>) => {
    const newSupplier: Supplier = {
      ...supplierData,
      id: `sup-${Date.now().toString().slice(-4)}`
    };
    setSuppliers((prev) => [newSupplier, ...prev]);
  };

  const resetAllDataToDefault = () => {
    setPlants(INITIAL_PLANTS);
    setGardeningProducts(INITIAL_GARDENING_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setSuppliers(INITIAL_SUPPLIERS);
    setIncomingBatches(INITIAL_INCOMING_BATCHES);
    setCart([]);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        plants,
        gardeningProducts,
        cart,
        orders,
        customers,
        suppliers,
        incomingBatches,
        currentView,
        setCurrentView,
        selectedPlant,
        setSelectedPlant,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isEnquiryOpen,
        setIsEnquiryOpen,
        enquiryTarget,
        setEnquiryTarget,
        confirmedOrder,
        setConfirmedOrder,
        activePolicy,
        setActivePolicy,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        createOrder,
        updateOrderStatus,
        updatePlant,
        addPlant,
        adjustPlantStock,
        addIncomingBatch,
        addSupplier,
        resetAllDataToDefault
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
