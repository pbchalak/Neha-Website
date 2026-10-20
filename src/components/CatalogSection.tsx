import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PlantCategory } from '../types';
import { PlantCard } from './PlantCard';

const CATEGORIES: { label: string; value: PlantCategory | 'All' }[] = [
  { label: 'All Plants', value: 'All' },
  { label: 'Flowering Plants', value: 'Flowering Plants' },
  { label: 'Fruit Plants', value: 'Fruit Plants' },
  { label: 'Medicinal Plants', value: 'Medicinal Plants' },
  { label: 'Ornamental Plants', value: 'Ornamental Plants' },
  { label: 'Vegetable Seedlings', value: 'Vegetable Seedlings' }
];

export const CatalogSection: React.FC = () => {
  const { plants } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PlantCategory | 'All'>('All');
  const [selectedSunlight, setSelectedSunlight] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  // Filtered and sorted plants
  const filteredPlants = useMemo(() => {
    return plants
      .filter((plant) => {
        // Category filter
        if (selectedCategory !== 'All' && plant.category !== selectedCategory) {
          return false;
        }
        // Sunlight filter
        if (selectedSunlight !== 'All' && plant.sunlight !== selectedSunlight) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = plant.name.toLowerCase().includes(q);
          const matchScientific = plant.scientificName.toLowerCase().includes(q);
          const matchDesc = plant.shortDescription.toLowerCase().includes(q);
          const matchCategory = plant.category.toLowerCase().includes(q);
          if (!matchName && !matchScientific && !matchDesc && !matchCategory) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [plants, selectedCategory, selectedSunlight, searchQuery, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSunlight('All');
    setSortBy('featured');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedSunlight !== 'All' || sortBy !== 'featured';

  return (
    <section id="catalog" className="py-12 lg:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2D5A3C]">
              Green Garden Nursery Catalogue
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#142318] font-display mt-1">
              Explore Our Plant Varieties
            </h2>
            <p className="text-sm text-[#4E6052] max-w-xl mt-1.5">
              Acclimatized flowering shrubs, organic fruit trees, traditional medicinal herbs, air-purifying foliage, and vegetable seedlings.
            </p>
          </div>

          <div className="text-xs text-[#526356] font-mono tabular-nums">
            Showing {filteredPlants.length} of {plants.length} plant specimens
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="space-y-4 bg-white p-4 sm:p-5 rounded-xl border border-[#DFE5DE] shadow-2xs">
          {/* Row 1: Search and Category Pills (Interactive Segmented buttons) */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#7C8D80] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by plant name, botanical name, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#FAFAF8] border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5A3C] placeholder:text-[#8B9C8E]"
              />
            </div>

            {/* Sunlight & Sorting dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-xs text-[#526356]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#526356]" />
                <span className="hidden sm:inline">Sunlight:</span>
              </div>
              <select
                value={selectedSunlight}
                onChange={(e) => setSelectedSunlight(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-[#FAFAF8] border border-[#D5DED5] rounded-md text-[#213125] focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
              >
                <option value="All">All Sunlight Levels</option>
                <option value="Full Sun">Full Sun</option>
                <option value="Partial Sun / Shade">Partial Sun / Shade</option>
                <option value="Bright Indirect Light">Bright Indirect Light</option>
                <option value="Low to Medium Light">Low to Medium Light</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 text-xs bg-[#FAFAF8] border border-[#D5DED5] rounded-md text-[#213125] focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Botanical Name (A-Z)</option>
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#5A6D5F] hover:text-[#18261C] hover:bg-[#EEF3ED] rounded-md transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Interactive Category Segmented Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-[#EEF2EC]">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#2D5A3C] text-white shadow-xs'
                      : 'bg-[#F2F5F1] text-[#465549] hover:bg-[#E7EEE6] hover:text-[#18261C]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop layout with generous whitespace */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-[#CCD7CB] p-8 space-y-3">
            <Filter className="w-8 h-8 text-[#88998A] mx-auto" />
            <h3 className="text-base font-semibold text-[#18261C]">No plant varieties match your filter</h3>
            <p className="text-xs text-[#526356] max-w-sm mx-auto">
              Try adjusting your search query, switching categories, or clearing light requirements.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#234830] rounded-lg transition-colors"
            >
              Show All Plant Varieties
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
