import React, { useState } from 'react';
import { X, Send, CheckCircle, MessageSquare, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EnquiryModal: React.FC = () => {
  const { isEnquiryOpen, setIsEnquiryOpen, enquiryTarget } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    channel: 'WhatsApp',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isEnquiryOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsEnquiryOpen(false);
      setFormData({ name: '', phone: '', email: '', channel: 'WhatsApp', notes: '' });
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAFAF8] w-full max-w-lg rounded-2xl border border-[#DFE6DC] shadow-2xl p-6 sm:p-8 space-y-5 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsEnquiryOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-[#5B6D5F] hover:text-[#18261C] rounded-lg hover:bg-[#EEF3ED]"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2D5A3C]">
            Direct Horticultural Advisory
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#142318] font-display mt-0.5">
            Submit Plant Enquiry
          </h3>
          <p className="text-xs text-[#526356] mt-1 bg-[#EEF5ED] p-2 rounded border border-[#D5E2D3] font-medium text-[#20442B]">
            {enquiryTarget}
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle className="w-10 h-10 text-[#2D5A3C] mx-auto" />
            <h4 className="text-base font-bold text-[#18261C]">Enquiry Successfully Registered!</h4>
            <p className="text-xs text-[#526356] max-w-xs mx-auto">
              Our nursery team has received your inquiry. We will contact you via {formData.channel} within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#18261C]">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anand Joshi"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#18261C]">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98450 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#18261C]">Preferred Response *</label>
                <select
                  value={formData.channel}
                  onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                >
                  <option value="WhatsApp">WhatsApp Message</option>
                  <option value="Phone Call">Direct Phone Call</option>
                  <option value="Email">Email</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#18261C]">Email Address</label>
              <input
                type="email"
                placeholder="e.g. anand@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#18261C]">
                Questions on Quantity, Space, or Sunlight
              </label>
              <textarea
                rows={3}
                placeholder="How many plants do you need? What is your balcony or garden sunlight condition?"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#2D5A3C] hover:bg-[#22452E] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Plant Enquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
