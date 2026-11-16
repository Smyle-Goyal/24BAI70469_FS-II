package com.expensetracker.dto;

import java.math.BigDecimal;

public class CategorySummaryDTO {
    private String category;
    private BigDecimal totalAmount;
    private Long count;
    private Double percentage;

    public CategorySummaryDTO() {
    }

    public CategorySummaryDTO(String category, BigDecimal totalAmount, Long count, Double percentage) {
        this.category = category;
        this.totalAmount = totalAmount;
        this.count = count;
        this.percentage = percentage;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }
}
