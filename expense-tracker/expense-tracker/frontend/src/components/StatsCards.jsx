import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatsCards({ summary, selectedMonthName }) {
  const totalBalance = summary?.totalBalance ?? 0;
  const totalIncome = summary?.totalIncome ?? 0;
  const totalExpense = summary?.totalExpense ?? 0;
  const monthlyBalance = summary?.monthlyBalance ?? 0;
  const monthlyIncome = summary?.monthlyIncome ?? 0;
  const monthlyExpense = summary?.monthlyExpense ?? 0;

  const isBalancePositive = Number(totalBalance) >= 0;
  const isMonthlyPositive = Number(monthlyBalance) >= 0;

  const savingsRate = Number(monthlyIncome) > 0 
    ? Math.max(0, Math.round(((Number(monthlyIncome) - Number(monthlyExpense)) / Number(monthlyIncome)) * 100))
    : 0;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(Number(val) || 0);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Balance Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Balance</span>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            isBalancePositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            <Wallet className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            isBalancePositive ? 'text-slate-900' : 'text-rose-600'
          }`}>
            {formatCurrency(totalBalance)}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Net Overall Position</span>
          <span className={`font-semibold px-2 py-0.5 rounded-full ${
            isBalancePositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {isBalancePositive ? 'Healthy Surplus' : 'Deficit'}
          </span>
        </div>
      </div>

      {/* Total Income Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Income</span>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrency(totalIncome)}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {formatCurrency(monthlyIncome)}
          </span>
          <span>in {selectedMonthName || 'this month'}</span>
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Expenses</span>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrency(totalExpense)}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 text-rose-600 font-medium">
            <ArrowDownRight className="w-3.5 h-3.5" />
            {formatCurrency(monthlyExpense)}
          </span>
          <span>in {selectedMonthName || 'this month'}</span>
        </div>
      </div>

      {/* Monthly Net & Savings Rate */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Monthly Net Savings</span>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            isMonthlyPositive ? 'text-emerald-600' : 'text-rose-600'
          }`}>
            {formatCurrency(monthlyBalance)}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Savings Rate</span>
          <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            {savingsRate}% saved
          </span>
        </div>
      </div>
    </div>
  );
}
