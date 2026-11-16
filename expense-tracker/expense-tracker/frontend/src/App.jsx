import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import TransactionList from './components/TransactionList';
import MonthlyExpenseView from './components/MonthlyExpenseView';
import TransactionModal from './components/TransactionModal';
import { api } from './services/api';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function App() {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'monthly'

  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);

  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // UI state
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isResetting, setIsResetting] = useState(false);
  const [backendError, setBackendError] = useState(null);
  const [toast, setToast] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadAllData = useCallback(async () => {
    setLoading(true);
    setBackendError(null);
    try {
      const [txList, summaryData, catList] = await Promise.all([
        api.getTransactions({
          type: filterType || undefined,
          category: filterCategory || undefined,
          search: searchQuery || undefined,
        }),
        api.getSummary(selectedMonth, selectedYear),
        api.getCategories(),
      ]);

      setTransactions(txList || []);
      setSummary(summaryData);
      setCategories(catList || []);
    } catch (err) {
      console.error('Failed to load application data', err);
      setBackendError(
        err.message || 'Could not connect to Spring Boot API backend. Please ensure the backend is running at http://localhost:8080'
      );
    } finally {
      setLoading(false);
    }
  }, [filterType, filterCategory, searchQuery, selectedMonth, selectedYear]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData, refreshTrigger]);

  const handleOpenAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (tx) => {
    setEditingTransaction(tx);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = async (formData) => {
    if (formData.id) {
      await api.updateTransaction(formData.id, formData);
      showToast('Transaction updated successfully!');
    } else {
      await api.createTransaction(formData);
      showToast('Transaction added successfully!');
    }
    setRefreshTrigger(prev => prev + 1);
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await api.deleteTransaction(id);
        showToast('Transaction deleted successfully!');
        setRefreshTrigger(prev => prev + 1);
      } catch (err) {
        showToast(err.message || 'Failed to delete transaction', 'error');
      }
    }
  };

  const handleResetDemoData = async () => {
    if (window.confirm('Reset all transactions with realistic sample income & expense data?')) {
      setIsResetting(true);
      try {
        await api.resetDemoData();
        showToast('Demo data reloaded successfully!');
        setRefreshTrigger(prev => prev + 1);
      } catch (err) {
        showToast(err.message || 'Failed to reset demo data', 'error');
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2.5 text-sm font-medium ${
            toast.type === 'error'
              ? 'bg-rose-600 text-white border-rose-700'
              : 'bg-slate-900 text-white border-slate-800'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-300" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Header
        onAddClick={handleOpenAddModal}
        onResetClick={handleResetDemoData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isResetting={isResetting}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Backend Connectivity Error Alert */}
        {backendError && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Backend connection alert</h4>
              <p className="text-xs text-amber-700 mt-0.5">{backendError}</p>
              <p className="text-xs text-amber-800 mt-2 font-medium">
                Make sure your Spring Boot backend is running on port 8080 (e.g. via <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900">mvnw.cmd spring-boot:run</code>).
              </p>
            </div>
          </div>
        )}

        {/* Stats Cards: Balance, Income, Expense, Savings */}
        <StatsCards 
          summary={summary} 
          selectedMonthName={`${MONTH_NAMES[selectedMonth - 1]} ${selectedYear}`} 
        />

        {/* Active Tab Content */}
        {activeTab === 'overview' ? (
          <TransactionList
            transactions={transactions}
            categories={categories}
            filterType={filterType}
            setFilterType={setFilterType}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTransaction}
            onOpenAdd={handleOpenAddModal}
            loading={loading}
          />
        ) : (
          <MonthlyExpenseView
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
            refreshTrigger={refreshTrigger}
          />
        )}
      </main>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveTransaction}
        initialData={editingTransaction}
        categories={categories}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-400">
        <p>Expense Tracker Full Stack Application &bull; Built with Spring Boot &bull; React &bull; Tailwind CSS</p>
      </footer>
    </div>
  );
}
