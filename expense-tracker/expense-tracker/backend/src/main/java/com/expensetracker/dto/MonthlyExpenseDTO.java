package com.expensetracker.dto;

import java.math.BigDecimal;
import java.util.List;

public class MonthlyExpenseDTO {
    private Integer month;
    private Integer year;
    private String monthName;
    private BigDecimal totalExpense;
    private BigDecimal totalIncome;
    private BigDecimal netSavings;
    private List<CategorySummaryDTO> categoryBreakdown;

    public MonthlyExpenseDTO() {
    }

    public MonthlyExpenseDTO(Integer month, Integer year, String monthName, BigDecimal totalExpense, BigDecimal totalIncome, BigDecimal netSavings, List<CategorySummaryDTO> categoryBreakdown) {
        this.month = month;
        this.year = year;
        this.monthName = monthName;
        this.totalExpense = totalExpense;
        this.totalIncome = totalIncome;
        this.netSavings = netSavings;
        this.categoryBreakdown = categoryBreakdown;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getMonthName() {
        return monthName;
    }

    public void setMonthName(String monthName) {
        this.monthName = monthName;
    }

    public BigDecimal getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(BigDecimal totalExpense) {
        this.totalExpense = totalExpense;
    }

    public BigDecimal getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(BigDecimal totalIncome) {
        this.totalIncome = totalIncome;
    }

    public BigDecimal getNetSavings() {
        return netSavings;
    }

    public void setNetSavings(BigDecimal netSavings) {
        this.netSavings = netSavings;
    }

    public List<CategorySummaryDTO> getCategoryBreakdown() {
        return categoryBreakdown;
    }

    public void setCategoryBreakdown(List<CategorySummaryDTO> categoryBreakdown) {
        this.categoryBreakdown = categoryBreakdown;
    }
}
