import React from 'react';

const CATEGORY_COLORS = {
  'Food & Dining': 'bg-amber-100 text-amber-800 border-amber-200',
  'Rent & Housing': 'bg-blue-100 text-blue-800 border-blue-200',
  'Utilities': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'Transportation': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Entertainment': 'bg-purple-100 text-purple-800 border-purple-200',
  'Shopping': 'bg-pink-100 text-pink-800 border-pink-200',
  'Health & Fitness': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Salary': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Freelance': 'bg-teal-100 text-teal-800 border-teal-200',
  'Investments': 'bg-violet-100 text-violet-800 border-violet-200',
  'Education': 'bg-orange-100 text-orange-800 border-orange-200',
  'Travel': 'bg-sky-100 text-sky-800 border-sky-200',
  'Groceries': 'bg-lime-100 text-lime-800 border-lime-200',
  'Other': 'bg-slate-100 text-slate-800 border-slate-200',
};

export default function CategoryBadge({ category, size = 'sm' }) {
  const colorClass = CATEGORY_COLORS[category] || 'bg-slate-100 text-slate-700 border-slate-200';
  const sizeClass = size === 'xs' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${colorClass} ${sizeClass}`}>
      {category}
    </span>
  );
}
