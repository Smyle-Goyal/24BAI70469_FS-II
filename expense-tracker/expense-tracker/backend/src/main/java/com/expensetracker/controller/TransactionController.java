package com.expensetracker.controller;

import com.expensetracker.dto.BalanceSummaryDTO;
import com.expensetracker.dto.MonthlyExpenseDTO;
import com.expensetracker.dto.TransactionDTO;
import com.expensetracker.model.TransactionType;
import com.expensetracker.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getTransactions(
            @RequestParam(required = false) TransactionType type,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(transactionService.getTransactions(type, category, month, year, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getTransactionById(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction(@Valid @RequestBody TransactionDTO dto) {
        TransactionDTO created = transactionService.createTransaction(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTO> updateTransaction(
            @PathVariable Long id,
            @Valid @RequestBody TransactionDTO dto
    ) {
        return ResponseEntity.ok(transactionService.updateTransaction(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Transaction deleted successfully");
        response.put("id", id.toString());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/summary")
    public ResponseEntity<BalanceSummaryDTO> getSummary(
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year
    ) {
        return ResponseEntity.ok(transactionService.getBalanceSummary(month, year));
    }

    @GetMapping("/monthly-report")
    public ResponseEntity<MonthlyExpenseDTO> getMonthlyReport(
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year
    ) {
        return ResponseEntity.ok(transactionService.getMonthlyReport(month, year));
    }

    @GetMapping("/monthly-history")
    public ResponseEntity<List<MonthlyExpenseDTO>> getMonthlyHistory(
            @RequestParam(required = false) Integer year
    ) {
        return ResponseEntity.ok(transactionService.getYearlyMonthlyHistory(year));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(transactionService.getAvailableCategories());
    }

    @PostMapping("/reset-demo")
    public ResponseEntity<Map<String, String>> resetDemoData() {
        transactionService.seedSampleData();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Sample data loaded successfully");
        return ResponseEntity.ok(response);
    }
}
