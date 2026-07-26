import { useEffect, useState } from "react";

// Minimal, easy-to-read Fixer-based hook. Keeps logic small so the app renders.
function useCurrencyInfo(base = "USD") {
    const [rates, setRates] = useState({});

    useEffect(() => {
        if (!base) return;
        const b = String(base).toUpperCase();

        // Fixer access key from your project
        const ACCESS_KEY = "d786719b950686aa39e9508ad48cc647";
        // Request USD and INR (same as your original code) plus EUR so we can compute relative rates.
        const symbols = "USD,INR,EUR";
        const url = `https://data.fixer.io/api/latest?access_key=${ACCESS_KEY}&symbols=${symbols}`;

        let cancelled = false;
        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                if (cancelled) return;
                const fetched = json.rates || {};

                if (!fetched || Object.keys(fetched).length === 0) {
                    setRates({});
                    return;
                }

                // Fixer free tier returns rates relative to EUR.
                // To compute rates relative to `b`, divide each rate by rate[b] (or use directly if b === 'EUR').
                const baseRateInEUR = b === "EUR" ? 1 : fetched[b];
                if (b !== "EUR" && (baseRateInEUR === undefined || baseRateInEUR === 0)) {
                    // If the requested base wasn't among fetched symbols, return the fetched map (safe) or empty.
                    setRates({});
                    return;
                }

                const out = {};
                out[b] = 1;
                Object.keys(fetched).forEach((cur) => {
                    if (cur === b) return;
                    const value = b === "EUR" ? fetched[cur] : fetched[cur] / baseRateInEUR;
                    out[cur] = typeof value === "number" && Number.isFinite(value) ? value : 0;
                });

                setRates(out);
            })
            .catch(() => {
                if (cancelled) return;
                setRates({});
            });

        return () => {
            cancelled = true;
        };
    }, [base]);

    return rates;
}

export default useCurrencyInfo;