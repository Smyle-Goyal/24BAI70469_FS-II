package com.expensetracker.service;

import com.expensetracker.dto.BalanceSummaryDTO;
import com.expensetracker.dto.CategorySummaryDTO;
import com.expensetracker.dto.MonthlyExpenseDTO;
import com.expensetracker.dto.TransactionDTO;
import com.expensetracker.model.Transaction;
import com.expensetracker.model.TransactionType;
import com.expensetracker.repository.TransactionRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<TransactionDTO> getTransactions(TransactionType type, String category, Integer month, Integer year, String search) {
        LocalDate startDate = null;
        LocalDate endDate = null;

        if (year != null && month != null) {
            startDate = LocalDate.of(year, month, 1);
            endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
        } else if (year != null) {
            startDate = LocalDate.of(year, 1, 1);
            endDate = LocalDate.of(year, 12, 31);
        }

        List<Transaction> transactions = transactionRepository.searchTransactions(type, category, startDate, endDate, search);
        return transactions.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public TransactionDTO getTransactionById(Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Transaction not found with id: " + id));
        return toDTO(transaction);
    }

    public TransactionDTO createTransaction(TransactionDTO dto) {
        Transaction transaction = new Transaction();
        transaction.setTitle(dto.getTitle().trim());
        transaction.setAmount(dto.getAmount());
        transaction.setType(dto.getType());
        transaction.setCategory(dto.getCategory().trim());
        transaction.setDate(dto.getDate() != null ? dto.getDate() : LocalDate.now());
        transaction.setNotes(dto.getNotes() != null ? dto.getNotes().trim() : null);

        Transaction saved = transactionRepository.save(transaction);
        return toDTO(saved);
    }

    public TransactionDTO updateTransaction(Long id, TransactionDTO dto) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Transaction not found with id: " + id));

        transaction.setTitle(dto.getTitle().trim());
        transaction.setAmount(dto.getAmount());
        transaction.setType(dto.getType());
        transaction.setCategory(dto.getCategory().trim());
        transaction.setDate(dto.getDate());
        transaction.setNotes(dto.getNotes() != null ? dto.getNotes().trim() : null);

        Transaction updated = transactionRepository.save(transaction);
        return toDTO(updated);
    }

    public void deleteTransaction(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new NoSuchElementException("Transaction not found with id: " + id);
        }
        transactionRepository.deleteById(id);
    }

    public BalanceSummaryDTO getBalanceSummary(Integer month, Integer year) {
        LocalDate now = LocalDate.now();
        int targetMonth = (month != null) ? month : now.getMonthValue();
        int targetYear = (year != null) ? year : now.getYear();

        LocalDate monthStart = LocalDate.of(targetYear, targetMonth, 1);
        LocalDate monthEnd = monthStart.withDayOfMonth(monthStart.lengthOfMonth());

        // All-time totals
        BigDecimal totalIncome = transactionRepository.sumAmountByType(TransactionType.INCOME);
        BigDecimal totalExpense = transactionRepository.sumAmountByType(TransactionType.EXPENSE);
        BigDecimal totalBalance = totalIncome.subtract(totalExpense);

        // Selected month totals
        BigDecimal monthlyIncome = transactionRepository.sumAmountByTypeAndDateRange(TransactionType.INCOME, monthStart, monthEnd);
        BigDecimal monthlyExpense = transactionRepository.sumAmountByTypeAndDateRange(TransactionType.EXPENSE, monthStart, monthEnd);
        BigDecimal monthlyBalance = monthlyIncome.subtract(monthlyExpense);

        BalanceSummaryDTO summary = new BalanceSummaryDTO();
        summary.setTotalBalance(totalBalance);
        summary.setTotalIncome(totalIncome);
        summary.setTotalExpense(totalExpense);
        summary.setMonthlyBalance(monthlyBalance);
        summary.setMonthlyIncome(monthlyIncome);
        summary.setMonthlyExpense(monthlyExpense);
        summary.setTotalTransactions(transactionRepository.count());
        summary.setSelectedMonth(targetMonth);
        summary.setSelectedYear(targetYear);

        return summary;
    }

    public MonthlyExpenseDTO getMonthlyReport(Integer month, Integer year) {
        LocalDate now = LocalDate.now();
        int targetMonth = (month != null) ? month : now.getMonthValue();
        int targetYear = (year != null) ? year : now.getYear();

        LocalDate monthStart = LocalDate.of(targetYear, targetMonth, 1);
        LocalDate monthEnd = monthStart.withDayOfMonth(monthStart.lengthOfMonth());

        List<Transaction> monthTransactions = transactionRepository.findByDateBetweenOrderByDateDescCreatedAtDesc(monthStart, monthEnd);

        BigDecimal totalIncome = BigDecimal.ZERO;
        BigDecimal totalExpense = BigDecimal.ZERO;

        Map<String, BigDecimal> expenseByCategory = new HashMap<>();
        Map<String, Long> countByCategory = new HashMap<>();

        for (Transaction t : monthTransactions) {
            if (t.getType() == TransactionType.INCOME) {
                totalIncome = totalIncome.add(t.getAmount());
            } else {
                totalExpense = totalExpense.add(t.getAmount());
                expenseByCategory.merge(t.getCategory(), t.getAmount(), BigDecimal::add);
                countByCategory.merge(t.getCategory(), 1L, Long::sum);
            }
        }

        List<CategorySummaryDTO> categoryBreakdown = new ArrayList<>();
        if (totalExpense.compareTo(BigDecimal.ZERO) > 0) {
            for (Map.Entry<String, BigDecimal> entry : expenseByCategory.entrySet()) {
                double pct = entry.getValue().doubleValue() / totalExpense.doubleValue() * 100.0;
                categoryBreakdown.add(new CategorySummaryDTO(
                        entry.getKey(),
                        entry.getValue(),
                        countByCategory.getOrDefault(entry.getKey(), 0L),
                        Math.round(pct * 100.0) / 100.0
                ));
            }
        }

        categoryBreakdown.sort((a, b) -> b.getTotalAmount().compareTo(a.getTotalAmount()));

        String monthName = Month.of(targetMonth).getDisplayName(TextStyle.FULL, Locale.ENGLISH) + " " + targetYear;
        return new MonthlyExpenseDTO(
                targetMonth,
                targetYear,
                monthName,
                totalExpense,
                totalIncome,
                totalIncome.subtract(totalExpense),
                categoryBreakdown
        );
    }

    public List<MonthlyExpenseDTO> getYearlyMonthlyHistory(Integer year) {
        int targetYear = (year != null) ? year : LocalDate.now().getYear();
        List<MonthlyExpenseDTO> result = new ArrayList<>();
        for (int m = 1; m <= 12; m++) {
            result.add(getMonthlyReport(m, targetYear));
        }
        return result;
    }

    public List<String> getAvailableCategories() {
        Set<String> defaultCategories = new LinkedHashSet<>(Arrays.asList(
                "Food & Dining",
                "Rent & Housing",
                "Utilities",
                "Transportation",
                "Entertainment",
                "Shopping",
                "Health & Fitness",
                "Salary",
                "Freelance",
                "Investments",
                "Education",
                "Travel",
                "Groceries",
                "Other"
        ));

        defaultCategories.addAll(transactionRepository.findDistinctCategories());
        return new ArrayList<>(defaultCategories);
    }

    public TransactionDTO toDTO(Transaction entity) {
        return new TransactionDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getAmount(),
                entity.getType(),
                entity.getCategory(),
                entity.getDate(),
                entity.getNotes(),
                entity.getCreatedAt()
        );
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seedInitialDataIfEmpty() {
        if (transactionRepository.count() == 0) {
            seedSampleData();
        }
    }

    public void seedSampleData() {
        transactionRepository.deleteAll();

        LocalDate today = LocalDate.now();
        int currentYear = today.getYear();
        int currentMonth = today.getMonthValue();

        List<Transaction> samples = Arrays.asList(
                // Current month income
                new Transaction(null, "Monthly Salary", new BigDecimal("5500.00"), TransactionType.INCOME, "Salary", LocalDate.of(currentYear, currentMonth, 1), "Direct deposit for primary job"),
                new Transaction(null, "Freelance Design Work", new BigDecimal("1200.00"), TransactionType.INCOME, "Freelance", LocalDate.of(currentYear, currentMonth, 5), "Website redesign milestone payment"),
                new Transaction(null, "Stock Dividend", new BigDecimal("180.50"), TransactionType.INCOME, "Investments", LocalDate.of(currentYear, currentMonth, 12), "Quarterly dividend payout"),

                // Current month expenses
                new Transaction(null, "Apartment Rent", new BigDecimal("1600.00"), TransactionType.EXPENSE, "Rent & Housing", LocalDate.of(currentYear, currentMonth, 2), "Monthly rent payment"),
                new Transaction(null, "Supermarket Groceries", new BigDecimal("245.80"), TransactionType.EXPENSE, "Groceries", LocalDate.of(currentYear, currentMonth, 4), "Weekly organic grocery shopping"),
                new Transaction(null, "Electric & Gas Utility", new BigDecimal("135.20"), TransactionType.EXPENSE, "Utilities", LocalDate.of(currentYear, currentMonth, 7), "Monthly energy bill"),
                new Transaction(null, "Dinner at Italian Bistro", new BigDecimal("86.50"), TransactionType.EXPENSE, "Food & Dining", LocalDate.of(currentYear, currentMonth, 9), "Family dinner celebration"),
                new Transaction(null, "Fuel & Gas Station", new BigDecimal("65.00"), TransactionType.EXPENSE, "Transportation", LocalDate.of(currentYear, currentMonth, 11), "Full tank for car"),
                new Transaction(null, "Gym Membership", new BigDecimal("49.99"), TransactionType.EXPENSE, "Health & Fitness", LocalDate.of(currentYear, currentMonth, 13), "Monthly fitness club fee"),
                new Transaction(null, "Movie Night & Streaming", new BigDecimal("32.50"), TransactionType.EXPENSE, "Entertainment", LocalDate.of(currentYear, currentMonth, 14), "Cinema tickets & snack combo"),
                new Transaction(null, "Online Tech Books", new BigDecimal("58.00"), TransactionType.EXPENSE, "Education", LocalDate.of(currentYear, currentMonth, 15), "Architecture & programming books")
        );

        transactionRepository.saveAll(samples);
    }
}
