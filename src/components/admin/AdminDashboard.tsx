import React, { useState } from 'react';
import {
  LayoutDashboard,
  Sprout,
  ShoppingBag,
  Users,
  Truck,
  BarChart3,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Search,
  Filter,
  DollarSign,
  Package
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Plant, PlantCategory, CustomerOrder, IncomingSupplyBatch, Supplier } from '../../types';
import { NURSERY_ADMIN_STAFF } from '../../data/mockAdminData';

export const AdminDashboard: React.FC = () => {
  const {
    plants,
    orders,
    customers,
    suppliers,
    incomingBatches,
    updateOrderStatus,
    adjustPlantStock,
    updatePlant,
    addPlant,
    addIncomingBatch,
    addSupplier,
    setCurrentView
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'plants' | 'orders' | 'customers' | 'suppliers' | 'reports' | 'staff'
  >('overview');

  // Plant Editing / Adding State
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const [newPlantForm, setNewPlantForm] = useState<Omit<Plant, 'id'>>({
    name: '',
    scientificName: '',
    category: 'Flowering Plants',
    shortDescription: '',
    fullDescription: '',
    price: 150,
    stockQuantity: 25,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    sunlight: 'Full Sun',
    watering: 'Moderate (When topsoil is dry)',
    suitableSoil: 'Well-draining fertile garden loam',
    fertilizer: 'Balanced organic compost',
    careInstructions: ['Keep soil moist and provide adequate morning sunlight.']
  });

  // Incoming Batch Form State
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
  const [batchForm, setBatchForm] = useState<Omit<IncomingSupplyBatch, 'id'>>({
    batchNumber: `BATCH-${Date.now().toString().slice(-4)}`,
    supplierName: suppliers[0]?.name || 'Vedic Flora Breeders',
    plantOrItemName: plants[0]?.name || 'Rose',
    quantityReceived: 40,
    dateReceived: new Date().toISOString().split('T')[0],
    unitCost: 90,
    conditionNotes: 'Roots moist, vibrant green shoots, 0% transport shock.',
    verifiedBy: 'Ramesh K. (Chief Horticulturist)'
  });

  // Inventory Search filter
  const [plantSearch, setPlantSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<'All' | CustomerOrder['orderStatus']>('All');

  // Metrics computation
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalStockUnits = plants.reduce((sum, p) => sum + p.stockQuantity, 0);
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Preparing').length;
  const lowStockPlants = plants.filter((p) => p.stockQuantity <= 15);

  // Handle Export CSV
  const exportOrdersCSV = () => {
    const headers = ['Order ID', 'Customer Name', 'Email', 'Phone', 'Total', 'Payment Method', 'Payment Status', 'Order Status', 'Date'];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customerName}"`,
      o.email,
      o.phone,
      o.total,
      o.paymentMethod,
      o.paymentStatus,
      o.orderStatus,
      o.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `green_garden_nursery_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSavePlantEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlant) {
      updatePlant(editingPlant);
      setEditingPlant(null);
    }
  };

  const handleCreatePlant = (e: React.FormEvent) => {
    e.preventDefault();
    addPlant(newPlantForm);
    setIsAddPlantOpen(false);
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    addIncomingBatch(batchForm);
    setIsAddBatchOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F7F5] text-[#19271D]">
      {/* Admin Top Banner */}
      <div className="bg-[#1B3423] text-white border-b border-[#2B4934] px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#79CC92] font-semibold">
                Nursery Management System
              </span>
              <span className="text-white/40">/</span>
              <span className="text-xs text-white/80">Operations Console</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mt-0.5">
              Green Garden Nursery Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentView('storefront')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/15"
            >
              View Public Storefront
            </button>
            <div className="text-xs text-right hidden md:block">
              <span className="font-semibold block text-white">Ramesh Krishnan</span>
              <span className="text-white/60">Chief Horticulturist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation Bar */}
      <div className="bg-white border-b border-[#DFE6DD] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-[#2D5A3C] text-white shadow-xs'
                  : 'text-[#48594B] hover:bg-[#EEF4ED] hover:text-[#18261C]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Nursery Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('plants')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'plants'
                  ? 'bg-[#2D5A3C] text-white shadow-xs'
                  : 'text-[#48594B] hover:bg-[#EEF4ED] hover:text-[#18261C]'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>Plants & Inventory</span>
              <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded-full tabular-nums">
                {plants.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'orders'
                  ? 'bg-[#2D5A3C] text-white shadow-xs'
                  : 'text-[#48594B] hover:bg-[#EEF4ED] hover:text-[#18261C]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Customer Orders</span>
              {pendingOrdersCount > 0 && (
                <span className="text-[10px] bg-amber-500 text-white font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'customers'
                  ? 'bg-[#2D5A3C] text-white shadow-xs'
                  : 'text-[#48594B] hover:bg-[#EEF4ED] hover:text-[#18261C]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Customer Records</span>
              <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded-full tabular-nums">
                {customers.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('suppliers')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'suppliers'
                  ? 'bg-[#2D5A3C] text-white shadow-xs'
                  : 'text-[#48594B] hover:bg-[#EEF4ED] hover:text-[#18261C]'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Suppliers & Inflow</span>
              <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded-full tabular-nums">
                {suppliers.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'reports'
                  ? 'bg-[#2D5A3C] text-white shadow-xs'
                  : 'text-[#48594B] hover:bg-[#EEF4ED] hover:text-[#18261C]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Sales & Reports</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('staff')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'staff'
                  ? 'bg-[#2D5A3C] text-white shadow-xs'
                  : 'text-[#48594B] hover:bg-[#EEF4ED] hover:text-[#18261C]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Nursery Admins</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#DFE6DD] shadow-2xs space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5D6F61]">
                  Total Order Sales
                </span>
                <div className="text-2xl font-bold font-mono tabular-nums text-[#142318]">
                  ₹{totalRevenue.toLocaleString()}
                </div>
                <p className="text-[11px] text-[#2D5A3C] flex items-center gap-1 font-medium">
                  <span>From {orders.length} confirmed orders</span>
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#DFE6DD] shadow-2xs space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5D6F61]">
                  Total Plant Stock
                </span>
                <div className="text-2xl font-bold font-mono tabular-nums text-[#142318]">
                  {totalStockUnits.toLocaleString()} units
                </div>
                <p className="text-[11px] text-[#556758]">
                  Across {plants.length} botanical varieties
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#DFE6DD] shadow-2xs space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5D6F61]">
                  Active Fulfillment
                </span>
                <div className="text-2xl font-bold font-mono tabular-nums text-amber-700">
                  {pendingOrdersCount} orders
                </div>
                <p className="text-[11px] text-amber-800">
                  Pending nursery bed dispatch
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#DFE6DD] shadow-2xs space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5D6F61]">
                  Registered Suppliers
                </span>
                <div className="text-2xl font-bold font-mono tabular-nums text-[#142318]">
                  {suppliers.length} partners
                </div>
                <p className="text-[11px] text-[#556758]">
                  {incomingBatches.length} supply batches logged
                </p>
              </div>
            </div>

            {/* Low Stock Alerts */}
            {lowStockPlants.length > 0 && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Low Stock Warnings in Nursery Beds ({lowStockPlants.length} items below 15 units)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {lowStockPlants.map((plant) => (
                    <div
                      key={plant.id}
                      className="bg-white p-3 rounded-lg border border-amber-200/80 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-[#18261C]">{plant.name}</p>
                        <p className="text-[#657668] italic font-serif">{plant.scientificName}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-amber-700 tabular-nums font-mono">
                          {plant.stockQuantity} left
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('suppliers');
                            setIsAddBatchOpen(true);
                            setBatchForm((prev) => ({ ...prev, plantOrItemName: plant.name }));
                          }}
                          className="block text-[11px] text-[#2D5A3C] hover:underline font-semibold mt-0.5"
                        >
                          Log Replenish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions & Recent Orders Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Recent Orders Overview */}
              <div className="lg:col-span-8 bg-white rounded-xl border border-[#DFE6DD] p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EEF2ED]">
                  <h3 className="text-sm font-bold text-[#18261C]">Recent Customer Orders</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#2D5A3C] hover:underline font-semibold"
                  >
                    View All Orders
                  </button>
                </div>

                <div className="divide-y divide-[#F0F4EF] text-xs">
                  {orders.slice(0, 4).map((order) => (
                    <div key={order.id} className="py-3 first:pt-0 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#18261C]">{order.id}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-[#2E3D31]">{order.customerName}</span>
                        </div>
                        <p className="text-[11px] text-[#5E6F62] mt-0.5">
                          {order.items.map((i) => `${i.name} (×${i.quantity})`).join(', ')}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-bold font-mono tabular-nums text-[#18261C] block">
                          ₹{order.total}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                            order.orderStatus === 'Delivered'
                              ? 'bg-[#EEF5ED] text-[#2D5A3C]'
                              : order.orderStatus === 'Dispatched'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nursery Operations Quick Tools */}
              <div className="lg:col-span-4 bg-white rounded-xl border border-[#DFE6DD] p-5 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-[#18261C]">Quick Nursery Actions</h3>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('plants');
                      setIsAddPlantOpen(true);
                    }}
                    className="w-full py-2.5 px-3 bg-[#EEF5ED] hover:bg-[#DEEADE] text-[#2D5A3C] text-xs font-semibold rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>Add New Plant Species</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('suppliers');
                      setIsAddBatchOpen(true);
                    }}
                    className="w-full py-2.5 px-3 bg-[#FAF7F0] hover:bg-[#F2ECE0] text-[#7A5B35] text-xs font-semibold rounded-lg transition-colors flex items-center justify-between border border-[#EBE4D5]"
                  >
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      <span>Log Inward Supply Batch</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={exportOrdersCSV}
                    className="w-full py-2.5 px-3 bg-white hover:bg-[#F4F6F3] text-[#445548] text-xs font-semibold rounded-lg transition-colors flex items-center justify-between border border-[#DCE4DA]"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>Export Orders (CSV)</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 bg-[#F8FAF7] rounded-lg border border-[#E3ECE1] text-[11px] text-[#556758] space-y-1">
                  <p className="font-semibold text-[#18261C]">Horticultural Schedule:</p>
                  <p>• Morning bed watering: Completed 07:30</p>
                  <p>• Neem foliar inspection: Scheduled 16:00</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PLANTS & INVENTORY */}
        {activeTab === 'plants' && (
          <div className="bg-white rounded-xl border border-[#DFE6DD] p-5 sm:p-6 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#142318] font-display">
                  Nursery Plant Inventory & Stock Management
                </h3>
                <p className="text-xs text-[#526356]">
                  Update botanical records, retail prices, and live sapling stock counts
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPlantOpen(true)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#234830] rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Plant Variety</span>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-[#7A8B7E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plant by common or botanical name..."
                value={plantSearch}
                onChange={(e) => setPlantSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAFAF8] border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
              />
            </div>

            {/* Plants Table */}
            <div className="overflow-x-auto border border-[#E2E8E0] rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F6F8F5] text-[#47574B] border-b border-[#E2E8E0]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Plant Name</th>
                    <th className="py-2.5 px-3 font-semibold">Botanical / Scientific</th>
                    <th className="py-2.5 px-3 font-semibold">Category</th>
                    <th className="py-2.5 px-3 font-semibold">Retail Price</th>
                    <th className="py-2.5 px-3 font-semibold">Stock Quantity</th>
                    <th className="py-2.5 px-3 font-semibold">Status</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF2EB]">
                  {plants
                    .filter((p) =>
                      plantSearch
                        ? p.name.toLowerCase().includes(plantSearch.toLowerCase()) ||
                          p.scientificName.toLowerCase().includes(plantSearch.toLowerCase())
                        : true
                    )
                    .map((plant) => (
                      <tr key={plant.id} className="hover:bg-[#F9FAF8] transition-colors">
                        <td className="py-3 px-3 font-semibold text-[#18261C]">
                          <div className="flex items-center gap-2">
                            <img
                              src={plant.image}
                              alt={plant.name}
                              className="w-8 h-8 rounded object-cover border border-[#D8E2D7] bg-[#EAEFE8]"
                              referrerPolicy="no-referrer"
                            />
                            <span>{plant.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 italic font-serif text-[#55675A]">
                          {plant.scientificName}
                        </td>
                        <td className="py-3 px-3 text-[#445548]">{plant.category}</td>
                        <td className="py-3 px-3 font-mono font-bold tabular-nums text-[#18261C]">
                          ₹{plant.price}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => adjustPlantStock(plant.id, Math.max(0, plant.stockQuantity - 5))}
                              className="w-5 h-5 flex items-center justify-center bg-[#EEF2EC] hover:bg-[#DEE5DC] rounded text-[#2B3B2E]"
                              title="-5 units"
                            >
                              -
                            </button>
                            <span className="w-10 text-center font-mono font-bold tabular-nums">
                              {plant.stockQuantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => adjustPlantStock(plant.id, plant.stockQuantity + 5)}
                              className="w-5 h-5 flex items-center justify-center bg-[#EEF2EC] hover:bg-[#DEE5DC] rounded text-[#2B3B2E]"
                              title="+5 units"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          {plant.stockQuantity > 15 ? (
                            <span className="text-[#2D5A3C] font-semibold text-[11px]">In Stock</span>
                          ) : plant.stockQuantity > 0 ? (
                            <span className="text-amber-700 font-semibold text-[11px]">Low Stock</span>
                          ) : (
                            <span className="text-red-700 font-semibold text-[11px]">Out of Stock</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => setEditingPlant(plant)}
                            className="px-2.5 py-1 text-xs text-[#2D5A3C] hover:bg-[#EEF5ED] rounded border border-[#CCDCCD] transition-colors"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl border border-[#DFE6DD] p-5 sm:p-6 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#142318] font-display">
                  Customer Orders & Nursery Fulfillment
                </h3>
                <p className="text-xs text-[#526356]">
                  Manage incoming customer orders, itemized root ball packaging, and dispatch status
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={exportOrdersCSV}
                  className="px-3 py-1.5 text-xs font-semibold text-[#2D5A3C] bg-[#EEF5ED] hover:bg-[#DFEDE0] rounded-lg transition-colors flex items-center gap-1.5 border border-[#CCDCCD]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Orders CSV</span>
                </button>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-xl border border-[#DFE6DC] bg-[#FAFBF9] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#E8EEE6]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#142318] text-sm">{order.id}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-xs text-[#2A3B2D]">{order.customerName}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-xs text-[#5C6E60]">{order.phone}</span>
                      </div>
                      <p className="text-[11px] text-[#697A6D] mt-0.5">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-[#142318] block tabular-nums">
                          ₹{order.total}
                        </span>
                        <span className="text-[10px] text-[#556758]">
                          {order.paymentMethod} ({order.paymentStatus})
                        </span>
                      </div>

                      {/* Status Selector */}
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                          order.orderStatus === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : order.orderStatus === 'Dispatched'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : order.orderStatus === 'Preparing'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-slate-100 text-slate-800 border-slate-300'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="p-2 bg-white rounded-lg border border-[#E5EBE3] flex items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 rounded object-cover border border-[#DFE6DC] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-[#18261C] truncate">{item.name}</p>
                          <p className="text-[11px] text-[#55675A]">
                            Qty: <span className="font-mono tabular-nums">{item.quantity}</span> × ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-[#5A6D5E] pt-1">
                    <span className="font-semibold text-[#18261C]">Delivery Address:</span> {order.deliveryAddress}, {order.city} - {order.pincode}
                    {order.notes && <span className="italic block text-[#69796C] mt-0.5">Note: "{order.notes}"</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMER RECORDS */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-xl border border-[#DFE6DD] p-5 sm:p-6 shadow-2xs space-y-5">
            <div>
              <h3 className="text-lg font-bold text-[#142318] font-display">
                Registered Customer Directory
              </h3>
              <p className="text-xs text-[#526356]">
                Customer contact details, total orders placed, and lifetime nursery spend
              </p>
            </div>

            <div className="overflow-x-auto border border-[#E2E8E0] rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F6F8F5] text-[#47574B] border-b border-[#E2E8E0]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Customer Name</th>
                    <th className="py-2.5 px-3 font-semibold">Contact Email</th>
                    <th className="py-2.5 px-3 font-semibold">Phone Number</th>
                    <th className="py-2.5 px-3 font-semibold">Primary Address</th>
                    <th className="py-2.5 px-3 font-semibold">Total Orders</th>
                    <th className="py-2.5 px-3 font-semibold">Lifetime Spend</th>
                    <th className="py-2.5 px-3 font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF2EB]">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F9FAF8]">
                      <td className="py-3 px-3 font-semibold text-[#18261C]">{c.name}</td>
                      <td className="py-3 px-3 text-[#4D6051]">{c.email}</td>
                      <td className="py-3 px-3 text-[#4D6051] font-mono">{c.phone}</td>
                      <td className="py-3 px-3 text-[#5A6C5D]">{c.address}</td>
                      <td className="py-3 px-3 font-mono font-bold tabular-nums text-center">{c.totalOrders}</td>
                      <td className="py-3 px-3 font-mono font-bold tabular-nums text-[#2D5A3C]">₹{c.totalSpent.toLocaleString()}</td>
                      <td className="py-3 px-3 text-[#6A7C6E]">{c.joinedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: SUPPLIERS & INCOMING STOCK */}
        {activeTab === 'suppliers' && (
          <div className="space-y-6">
            {/* Suppliers Registry */}
            <div className="bg-white rounded-xl border border-[#DFE6DD] p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-[#142318] font-display">
                    Nursery Suppliers & Seed Breeders
                  </h3>
                  <p className="text-xs text-[#526356]">
                    Direct partners providing saplings, wild seeds, organic compost, and terracotta pots
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suppliers.map((sup) => (
                  <div key={sup.id} className="p-4 rounded-xl border border-[#DFE6DC] bg-[#FAFBF9] space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-[#18261C]">{sup.name}</h4>
                      <span className="text-[11px] text-[#2D5A3C] font-semibold bg-[#EEF5ED] px-2 py-0.5 rounded">
                        {sup.activeContracts} active supplies
                      </span>
                    </div>
                    <div className="text-xs text-[#526356] space-y-0.5">
                      <p><span className="font-semibold text-[#18261C]">Contact:</span> {sup.contactPerson} ({sup.phone})</p>
                      <p><span className="font-semibold text-[#18261C]">Email:</span> {sup.email}</p>
                      <p><span className="font-semibold text-[#18261C]">Facility:</span> {sup.location}</p>
                      <p><span className="font-semibold text-[#18261C]">Supplies:</span> {sup.suppliedCategories.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inward Supply Batches Log */}
            <div className="bg-white rounded-xl border border-[#DFE6DD] p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-[#142318] font-display">
                    Incoming Plant & Supply Batches Log
                  </h3>
                  <p className="text-xs text-[#526356]">
                    Verified incoming shipments automatically replenish live nursery inventory
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddBatchOpen(true)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#234830] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Inward Supply Batch</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-[#E2E8E0] rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F6F8F5] text-[#47574B] border-b border-[#E2E8E0]">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">Batch No.</th>
                      <th className="py-2.5 px-3 font-semibold">Plant / Supply Item</th>
                      <th className="py-2.5 px-3 font-semibold">Supplier</th>
                      <th className="py-2.5 px-3 font-semibold">Quantity Received</th>
                      <th className="py-2.5 px-3 font-semibold">Unit Cost</th>
                      <th className="py-2.5 px-3 font-semibold">Date</th>
                      <th className="py-2.5 px-3 font-semibold">Inspection Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDF2EB]">
                    {incomingBatches.map((b) => (
                      <tr key={b.id} className="hover:bg-[#F9FAF8]">
                        <td className="py-3 px-3 font-mono font-bold text-[#18261C]">{b.batchNumber}</td>
                        <td className="py-3 px-3 font-semibold text-[#18261C]">{b.plantOrItemName}</td>
                        <td className="py-3 px-3 text-[#4D6051]">{b.supplierName}</td>
                        <td className="py-3 px-3 font-mono font-bold tabular-nums text-[#2D5A3C]">+{b.quantityReceived}</td>
                        <td className="py-3 px-3 font-mono tabular-nums">₹{b.unitCost}</td>
                        <td className="py-3 px-3 text-[#6A7C6E]">{b.dateReceived}</td>
                        <td className="py-3 px-3 text-[11px] text-[#55675A]">
                          <span className="block font-medium text-[#18261C]">{b.verifiedBy}</span>
                          <span className="italic text-[#728375]">{b.conditionNotes}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: REPORTS & ANALYTICS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#DFE6DD] p-5 sm:p-6 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF2EC]">
                <div>
                  <h3 className="text-lg font-bold text-[#142318] font-display">
                    Nursery Sales & Stock Distribution Report
                  </h3>
                  <p className="text-xs text-[#526356]">
                    Horticultural turnover, category inventory breakdown, and sales analysis
                  </p>
                </div>
                <button
                  type="button"
                  onClick={exportOrdersCSV}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#234830] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Performance Report (CSV)</span>
                </button>
              </div>

              {/* Category Breakdown Bar Visual */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C2C20]">
                  Live Nursery Stock by Plant Category
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    'Flowering Plants',
                    'Fruit Plants',
                    'Medicinal Plants',
                    'Ornamental Plants',
                    'Vegetable Seedlings'
                  ].map((category) => {
                    const catPlants = plants.filter((p) => p.category === category);
                    const stockSum = catPlants.reduce((sum, p) => sum + p.stockQuantity, 0);
                    const totalStock = plants.reduce((sum, p) => sum + p.stockQuantity, 0);
                    const percent = Math.round((stockSum / totalStock) * 100);

                    return (
                      <div key={category} className="p-3.5 bg-[#FAFBF9] rounded-xl border border-[#DFE6DC] space-y-2">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="font-semibold text-[#18261C]">{category}</span>
                          <span className="font-mono tabular-nums text-[#2D5A3C] font-bold">
                            {stockSum} units ({percent}%)
                          </span>
                        </div>
                        <div className="w-full bg-[#E3E8E1] h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#2D5A3C] h-full rounded-full transition-all"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-[#5C6E61]">
                          {catPlants.length} active cataloged varieties
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Methods Breakdown */}
              <div className="pt-4 border-t border-[#EEF2EC] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C2C20]">
                  Payment Gateways & Order Methods
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {['UPI', 'Cash on Delivery', 'Card', 'Net Banking'].map((method) => {
                    const methodOrders = orders.filter((o) => o.paymentMethod === method);
                    const methodTotal = methodOrders.reduce((sum, o) => sum + o.total, 0);
                    return (
                      <div key={method} className="p-3 bg-white rounded-lg border border-[#E2E8E0]">
                        <span className="text-[#55675A] font-medium block">{method}</span>
                        <span className="text-base font-bold text-[#142318] font-mono tabular-nums block mt-1">
                          ₹{methodTotal.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#78887B]">
                          {methodOrders.length} transactions
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: STAFF & ADMINISTRATOR ACCOUNTS */}
        {activeTab === 'staff' && (
          <div className="bg-white rounded-xl border border-[#DFE6DD] p-5 sm:p-6 shadow-2xs space-y-5">
            <div>
              <h3 className="text-lg font-bold text-[#142318] font-display">
                Nursery Administrator & Staff Accounts
              </h3>
              <p className="text-xs text-[#526356]">
                Authorised horticulturalists, stock inspectors, and order managers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {NURSERY_ADMIN_STAFF.map((staff) => (
                <div key={staff.id} className="p-4 rounded-xl border border-[#DFE6DC] bg-[#FAFBF9] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#2D5A3C] bg-[#EEF5ED] px-2 py-0.5 rounded">
                      {staff.accessLevel}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      {staff.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-[#18261C]">{staff.name}</h4>
                    <p className="text-xs text-[#4F6253]">{staff.role}</p>
                    <p className="text-[11px] text-[#697A6D] mt-1 font-mono">{staff.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Edit Plant Modal */}
      {editingPlant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAFAF8] w-full max-w-lg rounded-2xl border border-[#DFE6DC] p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <h3 className="text-base font-bold text-[#18261C]">
              Edit Plant: {editingPlant.name}
            </h3>

            <form onSubmit={handleSavePlantEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Plant Name</label>
                <input
                  type="text"
                  value={editingPlant.name}
                  onChange={(e) => setEditingPlant({ ...editingPlant, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Botanical / Scientific Name</label>
                <input
                  type="text"
                  value={editingPlant.scientificName}
                  onChange={(e) => setEditingPlant({ ...editingPlant, scientificName: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md italic"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Retail Price (₹)</label>
                  <input
                    type="number"
                    value={editingPlant.price}
                    onChange={(e) => setEditingPlant({ ...editingPlant, price: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingPlant.stockQuantity}
                    onChange={(e) => setEditingPlant({ ...editingPlant, stockQuantity: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingPlant.shortDescription}
                  onChange={(e) => setEditingPlant({ ...editingPlant, shortDescription: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#EEF2EC]">
                <button
                  type="button"
                  onClick={() => setEditingPlant(null)}
                  className="px-3 py-1.5 text-xs text-[#526356] hover:bg-[#EEF3ED] rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#234830] rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Plant Modal */}
      {isAddPlantOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAFAF8] w-full max-w-lg rounded-2xl border border-[#DFE6DC] p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <h3 className="text-base font-bold text-[#18261C]">
              Add New Botanical Specimen to Catalogue
            </h3>

            <form onSubmit={handleCreatePlant} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Plant Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chrysanthemum"
                  value={newPlantForm.name}
                  onChange={(e) => setNewPlantForm({ ...newPlantForm, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Scientific Botanical Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chrysanthemum morifolium"
                  value={newPlantForm.scientificName}
                  onChange={(e) => setNewPlantForm({ ...newPlantForm, scientificName: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md italic"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category *</label>
                  <select
                    value={newPlantForm.category}
                    onChange={(e) => setNewPlantForm({ ...newPlantForm, category: e.target.value as any })}
                    className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md"
                  >
                    <option value="Flowering Plants">Flowering Plants</option>
                    <option value="Fruit Plants">Fruit Plants</option>
                    <option value="Medicinal Plants">Medicinal Plants</option>
                    <option value="Ornamental Plants">Ornamental Plants</option>
                    <option value="Vegetable Seedlings">Vegetable Seedlings</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newPlantForm.price}
                    onChange={(e) => setNewPlantForm({ ...newPlantForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Initial Stock Count *</label>
                  <input
                    type="number"
                    required
                    value={newPlantForm.stockQuantity}
                    onChange={(e) => setNewPlantForm({ ...newPlantForm, stockQuantity: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Sunlight Requirement</label>
                  <select
                    value={newPlantForm.sunlight}
                    onChange={(e) => setNewPlantForm({ ...newPlantForm, sunlight: e.target.value as any })}
                    className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md"
                  >
                    <option value="Full Sun">Full Sun</option>
                    <option value="Partial Sun / Shade">Partial Sun / Shade</option>
                    <option value="Bright Indirect Light">Bright Indirect Light</option>
                    <option value="Low to Medium Light">Low to Medium Light</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summary of bloom characteristics and garden placement..."
                  value={newPlantForm.shortDescription}
                  onChange={(e) =>
                    setNewPlantForm({
                      ...newPlantForm,
                      shortDescription: e.target.value,
                      fullDescription: e.target.value
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#EEF2EC]">
                <button
                  type="button"
                  onClick={() => setIsAddPlantOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#526356] hover:bg-[#EEF3ED] rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#234830] rounded-md"
                >
                  Save & Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Inward Supply Batch Modal */}
      {isAddBatchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAFAF8] w-full max-w-lg rounded-2xl border border-[#DFE6DC] p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <h3 className="text-base font-bold text-[#18261C]">
              Log Inward Supply Batch & Replenish Stock
            </h3>

            <form onSubmit={handleCreateBatch} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Batch Code *</label>
                  <input
                    type="text"
                    required
                    value={batchForm.batchNumber}
                    onChange={(e) => setBatchForm({ ...batchForm, batchNumber: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Date Received *</label>
                  <input
                    type="date"
                    required
                    value={batchForm.dateReceived}
                    onChange={(e) => setBatchForm({ ...batchForm, dateReceived: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Supplier *</label>
                <select
                  value={batchForm.supplierName}
                  onChange={(e) => setBatchForm({ ...batchForm, supplierName: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md"
                >
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Plant or Item Replenished *</label>
                <select
                  value={batchForm.plantOrItemName}
                  onChange={(e) => setBatchForm({ ...batchForm, plantOrItemName: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md"
                >
                  {plants.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.scientificName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Quantity Received *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={batchForm.quantityReceived}
                    onChange={(e) => setBatchForm({ ...batchForm, quantityReceived: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md font-mono font-bold text-[#2D5A3C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Unit Cost (₹) *</label>
                  <input
                    type="number"
                    required
                    value={batchForm.unitCost}
                    onChange={(e) => setBatchForm({ ...batchForm, unitCost: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Quality Inspection Notes</label>
                <input
                  type="text"
                  value={batchForm.conditionNotes}
                  onChange={(e) => setBatchForm({ ...batchForm, conditionNotes: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Inspected & Verified By</label>
                <input
                  type="text"
                  value={batchForm.verifiedBy}
                  onChange={(e) => setBatchForm({ ...batchForm, verifiedBy: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-[#D5DED5] rounded-md"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#EEF2EC]">
                <button
                  type="button"
                  onClick={() => setIsAddBatchOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#526356] hover:bg-[#EEF3ED] rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#234830] rounded-md"
                >
                  Confirm Inward Receipt & Add to Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
