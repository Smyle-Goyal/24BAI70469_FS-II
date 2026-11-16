import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, ArrowDownRight, DollarSign, Calendar, Tag, FileText, Check } from 'lucide-react';

const DEFAULT_INCOME_CATEGORIES = [
  'Salary', 'Freelance', 'Investments', 'Gift', 'Other'
];

const DEFAULT_EXPENSE_CATEGORIES = [
  'Food & Dining', 'Rent & Housing', 'Groceries', 'Utilities',
  'Transportation', 'Entertainment', 'Shopping', 'Health & Fitness',
  'Education', 'Travel', 'Other'
];

export default function TransactionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  categories = []
}) {
  const isEditing = Boolean(initialData?.id);

  const [type, setType] = useState('EXPENSE');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setType(initialData.type || 'EXPENSE');
      setTitle(initialData.title || '');
      setAmount(initialData.amount ? String(initialData.amount) : '');
      setDate(initialData.date || new Date().toISOString().slice(0, 10));
      setNotes(initialData.notes || '');

      const cat = initialData.category || '';
      const pool = initialData.type === 'INCOME' ? DEFAULT_INCOME_CATEGORIES : DEFAULT_EXPENSE_CATEGORIES;
      if (pool.includes(cat) || categories.includes(cat)) {
        setCategory(cat);
        setIsCustomCategory(false);
      } else {
        setCategory('Other');
        setCustomCategory(cat);
        setIsCustomCategory(true);
      }
    } else {
      setType('EXPENSE');
      setTitle('');
      setAmount('');
      setCategory('Food & Dining');
      setCustomCategory('');
      setIsCustomCategory(false);
      setDate(new Date().toISOString().slice(0, 10));
      setNotes('');
    }
    setErrors({});
  }, [initialData, isOpen]);

  // When type changes, adjust default category
  const handleTypeChange = (newType) => {
    setType(newType);
    if (!isEditing) {
      if (newType === 'INCOME') {
        setCategory('Salary');
      } else {
        setCategory('Food & Dining');
      }
      setIsCustomCategory(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }

    const effectiveCategory = isCustomCategory ? customCategory.trim() : category;
    if (!effectiveCategory) {
      newErrors.category = 'Category is required';
    }

    if (!date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const effectiveCategory = isCustomCategory ? customCategory.trim() : category;
      await onSubmit({
        id: initialData?.id,
        type,
        title: title.trim(),
        amount: parseFloat(Number(amount).toFixed(2)),
        category: effectiveCategory,
        date,
        notes: notes.trim() || null,
      });
      onClose();
    } catch (err) {
      setErrors({ form: err.message || 'Failed to save transaction' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentCategoryPool = type === 'INCOME' ? DEFAULT_INCOME_CATEGORIES : DEFAULT_EXPENSE_CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {isEditing ? 'Edit Transaction' : 'New Transaction'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.form && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {errors.form}
            </div>
          )}

          {/* Type Toggle: Income vs Expense */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleTypeChange('EXPENSE')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition ${
                  type === 'EXPENSE'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-rose-700'
                }`}
              >
                <ArrowDownRight className="w-4 h-4" />
                <span>Expense</span>
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('INCOME')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition ${
                  type === 'INCOME'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Income</span>
              </button>
            </div>
          </div>

          {/* Amount & Date row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Amount ($) *
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition ${
                    errors.amount
                      ? 'border-rose-300 focus:ring-rose-500/20'
                      : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500'
                  }`}
                />
              </div>
              {errors.amount && <p className="text-[11px] text-rose-500 mt-1">{errors.amount}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition ${
                    errors.date
                      ? 'border-rose-300 focus:ring-rose-500/20'
                      : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500'
                  }`}
                />
              </div>
              {errors.date && <p className="text-[11px] text-rose-500 mt-1">{errors.date}</p>}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Title / Description *
            </label>
            <input
              type="text"
              placeholder={type === 'INCOME' ? 'e.g. Freelance Client Payment' : 'e.g. Supermarket Groceries'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition ${
                errors.title
                  ? 'border-rose-300 focus:ring-rose-500/20'
                  : 'border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500'
              }`}
            />
            {errors.title && <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>}
          </div>

          {/* Category selection */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Category *
              </label>
              <button
                type="button"
                onClick={() => setIsCustomCategory(!isCustomCategory)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {isCustomCategory ? 'Choose from list' : '+ Custom category'}
              </button>
            </div>

            {isCustomCategory ? (
              <input
                type="text"
                placeholder="Enter custom category name..."
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            ) : (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1 border border-slate-100 rounded-xl bg-slate-50/50">
                  {currentCategoryPool.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                        category === cat
                          ? 'bg-emerald-600 text-white border-emerald-600 font-semibold shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {errors.category && <p className="text-[11px] text-rose-500 mt-1">{errors.category}</p>}
          </div>

          {/* Notes (Optional) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Notes / Receipt Remarks (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Additional details or reference..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`inline-flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-white rounded-xl shadow-xs transition ${
                type === 'INCOME'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{submitting ? 'Saving...' : isEditing ? 'Update Transaction' : 'Save Transaction'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
