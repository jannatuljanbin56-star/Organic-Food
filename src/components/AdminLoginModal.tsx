import React, { useState } from 'react';
import { Lock, X, KeyRound, ShieldAlert, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminLoginModal: React.FC = () => {
  const { isAdminLoginModalOpen, setIsAdminLoginModalOpen, adminLogin, language } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const success = adminLogin(password.trim());
    if (!success) {
      setError(true);
    } else {
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-xs">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                {language === 'bn' ? 'অ্যাডমিন প্যানেল লগইন' : 'Admin Panel Authentication'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'bn' ? 'শুধুমাত্র অনুমোদিত অ্যাডমিনদের জন্য সংরক্ষিত' : 'Restricted for authorized store administrators only'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsAdminLoginModalOpen(false);
              setError(false);
              setPassword('');
            }}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <KeyRound className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">
                {language === 'bn' ? 'অ্যাডমিন সিক্রেট পাসওয়ার্ড:' : 'Default Admin Password:'}
              </strong>
              <span className="font-mono bg-white px-1.5 py-0.5 rounded text-stone-900 border border-amber-300 font-bold">
                admin123
              </span>
              <span className="ml-1.5 text-stone-500 text-[11px]">
                {language === 'bn' ? '(পাসওয়ার্ড টাইপ করে প্রবেশ করুন)' : '(Type password to enter)'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {language === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড লিখুন *' : 'Enter Admin Password *'}
            </label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900"
            />
          </div>

          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                {language === 'bn' 
                  ? 'ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড লিখুন (ডিফল্ট: admin123)' 
                  : 'Incorrect password. Try again (Default: admin123)'}
              </span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsAdminLoginModalOpen(false);
                setError(false);
                setPassword('');
              }}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'লগইন করুন' : 'Unlock Admin Panel'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
