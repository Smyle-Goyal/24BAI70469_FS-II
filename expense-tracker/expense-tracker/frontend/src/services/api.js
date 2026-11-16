const API_BASE_URL = 'http://localhost:8080/api/transactions';

async function handleResponse(response) {
  if (!response.ok) {
    let errorMsg = `HTTP Error: ${response.statusText}`;
    try {
      const errorJson = await response.json();
      if (errorJson.message) {
        errorMsg = errorJson.message;
      } else if (errorJson.fieldErrors) {
        errorMsg = Object.values(errorJson.fieldErrors).join(', ');
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(errorMsg);
  }
  return response.json();
}

export const api = {
  async getTransactions(params = {}) {
    const query = new URLSearchParams();
    if (params.type) query.append('type', params.type);
    if (params.category) query.append('category', params.category);
    if (params.month) query.append('month', params.month);
    if (params.year) query.append('year', params.year);
    if (params.search) query.append('search', params.search);

    const url = `${API_BASE_URL}?${query.toString()}`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  async getTransactionById(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    return handleResponse(res);
  },

  async createTransaction(transaction) {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    return handleResponse(res);
  },

  async updateTransaction(id, transaction) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    return handleResponse(res);
  },

  async deleteTransaction(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(res);
  },

  async getSummary(month, year) {
    const query = new URLSearchParams();
    if (month) query.append('month', month);
    if (year) query.append('year', year);
    const res = await fetch(`${API_BASE_URL}/summary?${query.toString()}`);
    return handleResponse(res);
  },

  async getMonthlyReport(month, year) {
    const query = new URLSearchParams();
    if (month) query.append('month', month);
    if (year) query.append('year', year);
    const res = await fetch(`${API_BASE_URL}/monthly-report?${query.toString()}`);
    return handleResponse(res);
  },

  async getMonthlyHistory(year) {
    const query = new URLSearchParams();
    if (year) query.append('year', year);
    const res = await fetch(`${API_BASE_URL}/monthly-history?${query.toString()}`);
    return handleResponse(res);
  },

  async getCategories() {
    const res = await fetch(`${API_BASE_URL}/categories`);
    return handleResponse(res);
  },

  async resetDemoData() {
    const res = await fetch(`${API_BASE_URL}/reset-demo`, {
      method: 'POST',
    });
    return handleResponse(res);
  },
};
