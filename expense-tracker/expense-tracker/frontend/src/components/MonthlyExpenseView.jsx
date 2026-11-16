import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  PieChart, 
  TrendingDown, 
  ArrowUpRight, 
  Receipt,
  Layers
} from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import { api } from '../services/api';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthlyExpenseView({ 
  selectedMonth, 
  selectedYear, 
  onMonthChange, 
  onYearChange,
  refreshTrigger 
}) {
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [yearlyHistory, setYearlyHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMonthlyData();
  }, [selectedMonth, selectedYear, refreshTrigger]);

  const loadMonthlyData = async () => {
    setLoading(true);
    try {
      const [report, history] = await Promise.all([
        api.getMonthlyReport(selectedMonth, selectedYear),
        api.getMonthlyHistory(selectedYear),
      ]);
      setMonthlyReport(report);
      setYearlyHistory(history || []);
    } catch (err) {
      console.error('Failed to load monthly expenses', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      onMonthChange(12);
      onYearChange(selectedYear - 1);
    } else {
      onMonthChange(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      onMonthChange(1);
      onYearChange(selectedYear + 1);
    } else {
      onMonthChange(selectedMonth + 1);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(Number(val) || 0);
  };

  const totalExpense = monthlyReport?.totalExpense ?? 0;
  const totalIncome = monthlyReport?.totalIncome ?? 0;
  const netSavings = monthlyReport?.netSavings ?? 0;
  const breakdown = monthlyReport?.categoryBreakdown || [];

  // Calculate highest monthly expense for chart bar heights
  const maxYearlyExpense = yearlyHistory.reduce(
    (max, item) => Math.max(max, Number(item.totalExpense || 0)),
    0
  ) || 1;

  return (
    <div className="space-y-6">
      {/* Monthly Navigation Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Monthly Expense Analysis
            </h2>
            <p className="text-xs text-slate-500">
              Detailed breakdown of spendings and monthly budget performance
            </p>
          </div>
        </div>

        {/* Month Selector Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-3 py-1 font-semibold text-sm text-slate-800 min-w-32 text-center">
            {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
          </span>

          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Monthly Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span>Expenses ({MONTH_NAMES[selectedMonth - 1]})</span>
            <TrendingDown className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-rose-600">
            {formatCurrency(totalExpense)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Total money spent this month
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span>Income ({MONTH_NAMES[selectedMonth - 1]})</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {formatCurrency(totalIncome)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Total money received this month
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span>Net Monthly Balance</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              Number(netSavings) >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              {Number(netSavings) >= 0 ? 'Positive' : 'Deficit'}
            </span>
          </div>
          <div className={`text-2xl font-bold ${
            Number(netSavings) >= 0 ? 'text-slate-900' : 'text-rose-600'
          }`}>
            {formatCurrency(netSavings)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Income minus expenses for this period
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown Progress Bars (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900">Expenses by Category</h3>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {breakdown.length} {breakdown.length === 1 ? 'Category' : 'Categories'}
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-slate-400">Loading breakdown...</div>
          ) : breakdown.length === 0 ? (
            <div className="py-12 text-center">
              <Receipt className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No expenses recorded</p>
              <p className="text-xs text-slate-400 mt-1">
                No expense transactions logged for {MONTH_NAMES[selectedMonth - 1]} {selectedYear}.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {breakdown.map((item) => (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CategoryBadge category={item.category} size="xs" />
                      <span className="text-slate-400">({item.count} items)</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="text-slate-900">{formatCurrency(item.totalAmount)}</span>
                      <span className="text-slate-500 w-10 text-right">{item.percentage}%</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(5, item.percentage))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 12-Month Yearly Expense Trend Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900">{selectedYear} Monthly Trend</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Click a bar to view that month
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-6">
              Compare monthly expense volume across the entire year {selectedYear}.
            </p>
          </div>

          {/* Bar Chart Container */}
          <div className="h-56 flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2 px-1 border-b border-slate-100">
            {yearlyHistory.map((item) => {
              const expenseVal = Number(item.totalExpense || 0);
              const heightPct = maxYearlyExpense > 0 
                ? Math.round((expenseVal / maxYearlyExpense) * 100) 
                : 0;
              const isSelected = item.month === selectedMonth;

              return (
                <div 
                  key={item.month} 
                  onClick={() => onMonthChange(item.month)}
                  className="flex-1 flex flex-col items-center cursor-pointer group h-full justify-end"
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] rounded px-1.5 py-0.5 absolute -translate-y-8 pointer-events-none whitespace-nowrap z-10 shadow">
                    {MONTH_NAMES[item.month - 1].substring(0, 3)}: {formatCurrency(expenseVal)}
                  </div>

                  {/* The bar */}
                  <div 
                    style={{ height: `${Math.max(6, heightPct)}%` }}
                    className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 ${
                      isSelected
                        ? 'bg-emerald-600 shadow-sm shadow-emerald-500/30'
                        : expenseVal > 0
                        ? 'bg-slate-200 group-hover:bg-emerald-400'
                        : 'bg-slate-100'
                    }`}
                  />
                  {/* Month Label */}
                  <span className={`text-[11px] mt-2 font-medium transition ${
                    isSelected ? 'text-emerald-700 font-bold' : 'text-slate-400 group-hover:text-slate-700'
                  }`}>
                    {MONTH_NAMES[item.month - 1].substring(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block" />
              <span>Selected Month</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-slate-200 inline-block" />
              <span>Other Months</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
