import React, { useState } from 'react';
import { Droplets, Sun, Layers, Sparkles, Scissors, ShieldAlert, CheckCircle2, AlertTriangle, Bug } from 'lucide-react';
import { CARE_GUIDES, PEST_DIRECTORY } from '../data/careGuides';

export const PlantCareSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('watering');
  const [showPestModal, setShowPestModal] = useState<boolean>(false);

  const selectedGuide = CARE_GUIDES.find((g) => g.id === activeTab) || CARE_GUIDES[0];

  const getTabIcon = (id: string) => {
    switch (id) {
      case 'watering': return <Droplets className="w-4 h-4" />;
      case 'sunlight': return <Sun className="w-4 h-4" />;
      case 'soil': return <Layers className="w-4 h-4" />;
      case 'fertilizers': return <Sparkles className="w-4 h-4" />;
      case 'pruning': return <Scissors className="w-4 h-4" />;
      case 'pest-management': return <ShieldAlert className="w-4 h-4" />;
      case 'maintenance': return <CheckCircle2 className="w-4 h-4" />;
      default: return <Droplets className="w-4 h-4" />;
    }
  };

  return (
    <section id="care-guide" className="py-12 lg:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2D5A3C]">
              Botanical Nursery Knowledge Base
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#142318] font-display mt-1">
              Plant Care Guide & Pest Management
            </h2>
            <p className="text-sm text-[#4E6052] max-w-xl mt-1.5">
              Educational horticultural guidance compiled by Green Garden nursery specialists to help your green spaces thrive.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveTab('pest-management');
              setShowPestModal(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#2D5A3C] bg-[#EEF5EE] hover:bg-[#E0EBE0] border border-[#CADCCA] rounded-lg transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <Bug className="w-3.5 h-3.5" />
            <span>Pest Identification Directory</span>
          </button>
        </div>

        {/* Care Guide Tab Navigation (Interactive segmented buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar border-b border-[#E3E8E1]">
          {CARE_GUIDES.map((guide) => {
            const isActive = activeTab === guide.id;
            return (
              <button
                key={guide.id}
                type="button"
                onClick={() => setActiveTab(guide.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#2D5A3C] text-white shadow-xs'
                    : 'bg-[#F2F5F1] text-[#47574B] hover:bg-[#E6EDE5] hover:text-[#18261C]'
                }`}
              >
                {getTabIcon(guide.id)}
                <span>{guide.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Care Guide Content Card */}
        <div className="bg-white rounded-2xl border border-[#DFE6DC] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EEF2EC]">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#142318] font-display flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-[#EEF4EE] text-[#2D5A3C]">
                  {getTabIcon(selectedGuide.id)}
                </span>
                <span>{selectedGuide.title}</span>
              </h3>
              <p className="text-sm text-[#465549] mt-1.5 leading-relaxed">
                {selectedGuide.overview}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E9E4DC] max-w-xs text-xs text-[#6A5A48] shrink-0">
              <span className="font-semibold block text-[#4C3B29] mb-0.5">Seasonal Note:</span>
              <span>{selectedGuide.seasonalAdvice}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Key Practices */}
            <div className="lg:col-span-7 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C2C20] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A3C]" />
                <span>Recommended Horticultural Practices</span>
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-[#3E4F42]">
                {selectedGuide.keyPractices.map((practice, idx) => (
                  <li key={idx} className="p-3 rounded-lg bg-[#F9FAF8] border border-[#E8EEE6] leading-relaxed">
                    {practice}
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes to Avoid */}
            <div className="lg:col-span-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#914620] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#C25828]" />
                <span>Common Mistakes to Avoid</span>
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-[#5C4535]">
                {selectedGuide.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="p-3 rounded-lg bg-[#FFF8F5] border border-[#F6E1D7] leading-relaxed">
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Pest Section Link if on pest tab */}
          {selectedGuide.id === 'pest-management' && (
            <div className="pt-4 border-t border-[#EEF2EC]">
              <h4 className="text-sm font-semibold text-[#18261C] mb-3">
                Common Nursery Pests & Organic Remedies
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PEST_DIRECTORY.map((pest, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#DFE6DC] text-xs space-y-1.5">
                    <p className="font-bold text-[#142318] text-sm">{pest.name}</p>
                    <p className="text-[#5B6C5E]">
                      <span className="font-semibold text-[#2D5A3C]">Symptoms: </span>
                      {pest.symptoms}
                    </p>
                    <p className="text-[#5B6C5E]">
                      <span className="font-semibold text-[#8C5F30]">Targets: </span>
                      {pest.affectedPlants}
                    </p>
                    <p className="text-[#36493B] bg-[#EEF5ED] p-2 rounded border border-[#D5E2D3] mt-2">
                      <span className="font-semibold text-[#20442B]">Remedy: </span>
                      {pest.organicRemedy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
