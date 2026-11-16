import React from 'react';
import { Wallet, PlusCircle, RefreshCw, BarChart3, ListFilter } from 'lucide-react';

export default function Header({ 
  onAddClick, 
  onResetClick, 
  activeTab, 
  setActiveTab, 
  isResetting 
}) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 self-start sm:self-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Expense Tracker</h1>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                  Full Stack
                </span>
              </div>
              <p className="text-xs text-slate-500">Spring Boot &bull; React &bull; Tailwind CSS</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl self-stretch sm:self-center">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeTab === 'overview'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              <span>Dashboard & Transactions</span>
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeTab === 'monthly'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Monthly Expenses & Analytics</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={onResetClick}
              disabled={isResetting}
              title="Reset with sample income & expense data"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-lg transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Demo Data</span>
            </button>

            <button
              onClick={onAddClick}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-sm shadow-emerald-600/30 transition-all duration-150"
            >
              <PlusCircle className="w-4.5 h-4.5" />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
