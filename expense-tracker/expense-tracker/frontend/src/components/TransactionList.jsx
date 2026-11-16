import React from 'react';
import { 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Download, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Inbox
} from 'lucide-react';
import CategoryBadge from './CategoryBadge';

export default function TransactionList({
  transactions,
  categories,
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  searchQuery,
  setSearchQuery,
  onEdit,
  onDelete,
  onOpenAdd,
  loading
}) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(Number(val) || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Export visible transactions to CSV
  const handleExportCSV = () => {
    if (!transactions || transactions.length === 0) return;
    const headers = ['ID', 'Date', 'Title', 'Type', 'Category', 'Amount', 'Notes'];
    const rows = transactions.map(t => [
      t.id,
      t.date,
      `"${(t.title || '').replace(/"/g, '""')}"`,
      t.type,
      `"${(t.category || '').replace(/"/g, '""')}"`,
      t.amount,
      `"${(t.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Filters & Search Header */}
      <div className="p-4 sm:p-6 border-b border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Transaction History</h2>
            <p className="text-xs text-slate-500">
              Showing {transactions.length} recorded {transactions.length === 1 ? 'transaction' : 'transactions'}
            </p>
          </div>

          {/* Export CSV button */}
          <button
            onClick={handleExportCSV}
            disabled={transactions.length === 0}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Filter controls row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          {/* Search Bar (6 cols) */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          {/* Type Filter Tabs (4 cols) */}
          <div className="sm:col-span-4 flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterType('')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                !filterType ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('INCOME')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                filterType === 'INCOME' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setFilterType('EXPENSE')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                filterType === 'EXPENSE' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              Expenses
            </button>
          </div>

          {/* Category Dropdown (3 cols) */}
          <div className="sm:col-span-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full py-2 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table / List */}
      <div className="divide-y divide-slate-100">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-400">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No transactions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              {searchQuery || filterType || filterCategory 
                ? 'Try adjusting your search query or filters to find what you are looking for.'
                : 'Get started by creating your first income or expense transaction.'}
            </p>
            <button
              onClick={onOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
            >
              + Add Transaction
            </button>
          </div>
        ) : (
          transactions.map((tx) => {
            const isIncome = tx.type === 'INCOME';

            return (
              <div 
                key={tx.id} 
                className="p-4 sm:px-6 hover:bg-slate-50/80 transition flex items-center justify-between gap-4 group"
              >
                {/* Left: Type Icon + Title + Category + Date */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {isIncome ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900 text-sm truncate">
                        {tx.title}
                      </span>
                      <CategoryBadge category={tx.category} size="xs" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(tx.date)}
                      </span>
                      {tx.notes && (
                        <>
                          <span>&bull;</span>
                          <span className="truncate max-w-[200px] text-slate-500" title={tx.notes}>
                            {tx.notes}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Amount + Actions */}
                <div className="flex items-center gap-4 shrink-0">
                  <span className={`text-base sm:text-lg font-bold tracking-tight ${
                    isIncome ? 'text-emerald-600' : 'text-slate-900'
                  }`}>
                    {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
                  </span>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                    <button
                      onClick={() => onEdit(tx)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      title="Edit transaction"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(tx.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
