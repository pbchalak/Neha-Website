import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactSection: React.FC = () => {
  const { setIsEnquiryOpen, setEnquiryTarget } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Plant Availability',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', category: 'Plant Availability', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-12 lg:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2D5A3C]">
            Direct Nursery Communications
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#142318] font-display">
            Contact Green Garden Nursery
          </h2>
          <p className="text-sm text-[#4E6052]">
            For plant availability, bulk landscaping enquiries, and gardening guidance, connect with our botanical nursery team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 bg-white rounded-xl border border-[#DFE5DC] shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-[#18261C]">Confirmed Contact Channels</h3>
              
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#405244]">
                <Phone className="w-4 h-4 text-[#2D5A3C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#18261C]">Phone Number</span>
                  <span>+91 98000 12345 (Nursery Desk)</span>
                  <p className="text-[11px] text-[#78887B]">To be officially confirmed by nursery</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#405244]">
                <MessageSquare className="w-4 h-4 text-[#2D5A3C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#18261C]">WhatsApp Inquiries</span>
                  <span>+91 98000 12346</span>
                  <p className="text-[11px] text-[#78887B]">Instant plant photos and batch confirmation</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#405244]">
                <Mail className="w-4 h-4 text-[#2D5A3C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#18261C]">Email Address</span>
                  <span>enquiries@greengarden-nursery.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#405244]">
                <MapPin className="w-4 h-4 text-[#2D5A3C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#18261C]">Nursery Grounds & Farm</span>
                  <span>Green Garden Nursery Hub, Plantations Ring Road, Green Valley Agro Belt</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#405244]">
                <Clock className="w-4 h-4 text-[#2D5A3C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#18261C]">Business Hours</span>
                  <span>Mon – Sat: 8:00 AM – 6:30 PM</span>
                  <br />
                  <span>Sunday: 9:00 AM – 4:00 PM</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#EEF5ED] rounded-xl border border-[#D1E0D0] text-xs text-[#2A4430] flex items-center justify-between">
              <div>
                <p className="font-semibold">Need assistance with a specific plant?</p>
                <p className="text-[#4C6853]">Our horticulturists answer care queries within 2 hours.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEnquiryTarget('Direct Horticultural Consultation');
                  setIsEnquiryOpen(true);
                }}
                className="px-3 py-1.5 bg-white text-[#2D5A3C] font-semibold text-xs rounded-md shadow-2xs hover:bg-[#FAFBF9] shrink-0"
              >
                Quick Enquiry
              </button>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#DFE6DC] shadow-xs">
            <h3 className="text-xl font-bold text-[#142318] font-display mb-1">
              Send an Enquiry to the Nursery
            </h3>
            <p className="text-xs text-[#526356] mb-6">
              Inquire about live saplings, stock availability, bulk landscaping rates, or tailored soil recommendations.
            </p>

            {submitted ? (
              <div className="p-6 text-center bg-[#F2F7F1] border border-[#CCDCCD] rounded-xl space-y-2">
                <CheckCircle className="w-8 h-8 text-[#2D5A3C] mx-auto" />
                <h4 className="text-base font-bold text-[#18261C]">Thank You for Contacting Green Garden!</h4>
                <p className="text-xs text-[#4E6052]">
                  Your message has been received by our nursery care staff. We will respond shortly via phone or email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#18261C]">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAFAF8] border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#18261C]">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98450 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAFAF8] border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#18261C]">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. radhika@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAFAF8] border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#18261C]">Enquiry Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAFAF8] border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                    >
                      <option value="Plant Availability">Plant Stock Availability</option>
                      <option value="Bulk Order">Bulk Landscaping / Farm Supply</option>
                      <option value="Plant Care Query">Plant Care & Disease Diagnostic</option>
                      <option value="Gardening Essentials">Soil & Fertilizer Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#18261C]">Your Message or Questions</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the plants you need or gardening questions you have..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAFAF8] border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#2D5A3C] hover:bg-[#22452E] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Nursery Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
