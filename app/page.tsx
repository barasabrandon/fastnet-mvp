'use client';

import React, { useState } from 'react';
import { Wifi, HelpCircle, Edit2, Trash2, Plus, X, LogOut } from 'lucide-react';

interface Package {
  id: number;
  name: string;
  price: number;
  duration: string;
  devices: number;
  speed: string;
  popular?: boolean;
  noExpiry?: boolean;
}

interface PricingData {
  daily: Package[];
  weekly: Package[];
  monthly: Package[];
  data: Package[];
  social: Package[];
}

type TabId = 'daily' | 'weekly' | 'monthly' | 'data' | 'social';

interface Tab {
  id: TabId;
  label: string;
}

interface EditingPackage extends Package {
  category: TabId;
}

const initialPricingData: PricingData = {
  daily: [
    { id: 1, name: '1 hour unlimited', price: 5, duration: '1 hour', devices: 1, speed: '5Mbps' },
    { id: 2, name: '4hr unlimited', price: 10, duration: '4 hours', devices: 1, speed: '5Mbps', popular: true },
    { id: 3, name: '10hr unlimited', price: 15, duration: '10 hours', devices: 1, speed: '5Mbps' },
    { id: 4, name: '15 hour unlimited', price: 20, duration: '15 hours', devices: 1, speed: '5Mbps' },
    { id: 5, name: '24hr unlimited', price: 30, duration: '24 hours', devices: 1, speed: '5Mbps' },
    { id: 6, name: '2 devices 24hrs', price: 45, duration: '1 day', devices: 2, speed: '5Mbps' },
    { id: 7, name: '4 HRS streaming', price: 20, duration: '4 hours', devices: 1, speed: '9Mbps' },
    { id: 8, name: '24hrs Streaming', price: 52, duration: '1 day', devices: 1, speed: '8Mbps' },
  ],
  weekly: [
    { id: 11, name: '2-Day Unlimited', price: 50, duration: '2 days', devices: 1, speed: '5Mbps' },
    { id: 12, name: '3-Day Unlimited', price: 70, duration: '3 days', devices: 1, speed: '5Mbps' },
    { id: 13, name: '2-Day Duo', price: 80, duration: '3 days', devices: 2, speed: '5Mbps' },
    { id: 14, name: '3-Day Duo', price: 110, duration: '3 days', devices: 2, speed: '5Mbps' },
    { id: 15, name: 'Weekly Unlimited', price: 160, duration: '7 days', devices: 1, speed: '5Mbps' },
    { id: 16, name: 'Weekly Duo', price: 255, duration: '7 days', devices: 2, speed: '5Mbps' },
    { id: 17, name: 'Weekly Streaming', price: 270, duration: '7 days', devices: 1, speed: '8Mbps' },
  ],
  monthly: [
    { id: 18, name: '2 Weeks Unlimited', price: 299, duration: '14 days', devices: 1, speed: '5Mbps' },
    { id: 19, name: 'Streaming Package', price: 420, duration: '14 days', devices: 1, speed: '8Mbps' },
    { id: 20, name: '3 Weeks Unlimited', price: 430, duration: '21 days', devices: 1, speed: '5Mbps' },
    { id: 21, name: '2 Weeks 2 Devices', price: 480, duration: '14 days', devices: 2, speed: '5Mbps' },
    { id: 22, name: 'Monthly Unlimited', price: 550, duration: '30 days', devices: 1, speed: '5Mbps' },
    { id: 23, name: '3 Weeks Streaming', price: 580, duration: '21 days', devices: 1, speed: '8Mbps' },
    { id: 24, name: '3 Weeks 2 Devices', price: 680, duration: '21 days', devices: 2, speed: '5Mbps' },
    { id: 25, name: 'Monthly 2 Devices', price: 799, duration: '30 days', devices: 2, speed: '5Mbps' },
    { id: 26, name: 'Monthly Streaming Pack', price: 929, duration: '30 days', devices: 1, speed: '8Mbps' },
    { id: 27, name: 'Monthly 3 Devices', price: 1199, duration: '30 days', devices: 3, speed: '5Mbps' },
  ],
  data: [
    { id: 28, name: '3GB No Expiry', price: 29, duration: '3 GB', devices: 1, speed: '5Mbps', noExpiry: true },
    { id: 29, name: '7GB No Expiry', price: 99, duration: '7 GB', devices: 1, speed: '5Mbps', noExpiry: true },
  ],
  social: [],
};

export default function WiFiPricingApp() {
  const [activeTab, setActiveTab] = useState<TabId>('daily');
  const [voucherInput, setVoucherInput] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [pricingData, setPricingData] = useState<PricingData>(initialPricingData);
  const [editingPackage, setEditingPackage] = useState<EditingPackage | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<Partial<Package>>({});

  const tabs: Tab[] = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'data', label: 'Data' },
    { id: 'social', label: 'Social' },
  ];

  const handleConnect = (): void => {
    if (voucherInput.trim()) {
      alert(`Connecting with: ${voucherInput}`);
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (loginEmail === 'admin@gmail.com' && loginPassword === 'fastnet@001') {
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginError('');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = (): void => {
    setIsAdmin(false);
  };

  const handleEdit = (pkg: Package, category: TabId): void => {
    setEditingPackage({ ...pkg, category });
    setEditForm({ ...pkg });
    setShowEditModal(true);
  };

  const handleDelete = (pkgId: number, category: TabId): void => {
    if (confirm('Are you sure you want to delete this package?')) {
      setPricingData((prev) => ({
        ...prev,
        [category]: prev[category].filter((pkg) => pkg.id !== pkgId),
      }));
    }
  };

  const handleAddNew = (): void => {
    const allPackages = Object.values(pricingData).flat();
    const newId = allPackages.length > 0 ? Math.max(...allPackages.map((p) => p.id)) + 1 : 1;
    setEditingPackage({ id: 0, name: '', price: 0, duration: '', devices: 1, speed: '5Mbps', category: activeTab });
    setEditForm({
      id: newId,
      name: '',
      price: 0,
      duration: '',
      devices: 1,
      speed: '5Mbps',
      popular: false,
      noExpiry: false,
    });
    setShowEditModal(true);
  };

  const handleSavePackage = (): void => {
    if (!editingPackage) return;

    const category = editingPackage.category;
    const packageToSave = editForm as Package;

    if (editingPackage.id && editingPackage.id !== 0) {
      setPricingData((prev) => ({
        ...prev,
        [category]: prev[category].map((pkg) => (pkg.id === packageToSave.id ? packageToSave : pkg)),
      }));
    } else {
      setPricingData((prev) => ({
        ...prev,
        [category]: [...prev[category], packageToSave],
      }));
    }

    setShowEditModal(false);
    setEditingPackage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Admin Login/Logout Button */}
        <div className="flex justify-end mb-4">
          {!isAdmin ? (
            <button onClick={() => setShowLoginModal(true)} className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
              Admin Login
            </button>
          ) : (
            <button onClick={handleLogout} className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors shadow-lg flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
        </div>

        {/* Voucher Input Section */}
        <div className="bg-white rounded-3xl shadow-md border-2 border-gray-300 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center uppercase">Fastnet Wifi</h2>
          <input
            type="text"
            placeholder="Enter Voucher Code E.g TH35PQOM17 or Message"
            value={voucherInput}
            onChange={(e) => setVoucherInput(e.target.value)}
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-blue-500"
          />
          <button onClick={handleConnect} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors mb-4">
            Connect
          </button>
          <div className="bg-yellow-400 text-blue-900 font-bold py-4 px-6 rounded-xl text-center mb-4">Customer Care: 0743145612</div>
          <div className="text-center text-gray-600">
            Already paid?{' '}
            <a href="#" className="text-red-500 hover:text-red-600 font-semibold">
              Get Voucher
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-bold text-lg whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-blue-50'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Add New Package Button (Admin Only) */}
        {isAdmin && (
          <button onClick={handleAddNew} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl mb-4 flex items-center justify-center gap-2 transition-colors">
            <Plus className="w-5 h-5" />
            Add New Package
          </button>
        )}

        {/* Package Cards */}
        <div className="space-y-4">
          {pricingData[activeTab]?.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-md border-2 border-gray-300 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-6">
                <div className="text-left">
                  <div className="text-sm text-gray-500 font-semibold mb-1">KES</div>
                  <div className="text-5xl font-bold text-gray-900">{pkg.price}</div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{pkg.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-4 flex-wrap">
                    <span>{pkg.duration}</span>
                    <span>•</span>
                    <span>
                      {pkg.devices} Device{pkg.devices > 1 ? 's' : ''}
                    </span>
                    <span>•</span>
                    <span>{pkg.speed}</span>
                  </div>

                  {pkg.noExpiry && <div className="inline-block bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg mb-3 mr-2">NO EXPIRY</div>}

                  {pkg.popular && <div className="inline-block bg-orange-500 text-white font-bold px-4 py-2 rounded-lg mb-3">POPULAR</div>}

                  <div className="flex gap-3 items-center flex-wrap">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">BUY NOW</button>

                    {isAdmin && (
                      <>
                        <button onClick={() => handleEdit(pkg, activeTab)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2">
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button onClick={() => handleDelete(pkg.id, activeTab)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {pricingData[activeTab]?.length === 0 && (
            <div className="bg-white rounded-2xl shadow-md border-2 border-gray-300 p-12 text-center">
              <Wifi className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No packages available in this category</p>
            </div>
          )}
        </div>

        {/* Help Button */}
        <button className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-5 shadow-2xl transition-colors">
          <HelpCircle className="w-8 h-8" />
        </button>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border-2 border-gray-300 p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginError('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="admin@gmail.com" required />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter password"
                  required
                />
              </div>

              {loginError && <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4">{loginError}</div>}

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl border-2 border-gray-300 p-8 max-w-2xl w-full my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{editingPackage?.id ? 'Edit Package' : 'Add New Package'}</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Package Name</label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Monthly Unlimited"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Price (KES)</label>
                  <input
                    type="number"
                    value={editForm.price || 0}
                    onChange={(e) => setEditForm({ ...editForm, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Duration</label>
                  <input
                    type="text"
                    value={editForm.duration || ''}
                    onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 30 days"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Devices</label>
                  <input
                    type="number"
                    value={editForm.devices || 1}
                    onChange={(e) => setEditForm({ ...editForm, devices: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Speed</label>
                  <input
                    type="text"
                    value={editForm.speed || '5Mbps'}
                    onChange={(e) => setEditForm({ ...editForm, speed: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 5Mbps"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editForm.popular || false} onChange={(e) => setEditForm({ ...editForm, popular: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-700 font-semibold">Mark as Popular</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editForm.noExpiry || false} onChange={(e) => setEditForm({ ...editForm, noExpiry: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-700 font-semibold">No Expiry</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={handleSavePackage} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Save Package
                </button>
                <button onClick={() => setShowEditModal(false)} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
