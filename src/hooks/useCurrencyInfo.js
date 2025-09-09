import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const base = currency.toLowerCase();

  useEffect(() => {
    const endpoints = [
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.min.json`,
      `https://latest.currency-api.pages.dev/v1/currencies/${base}.min.json`,
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`,
      `https://latest.currency-api.pages.dev/v1/currencies/${base}.json`,
    ];

    async function fetchWithFallback(urls) {
      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const json = await res.json();
          if (json[base]) {
            setData(json[base]);
            return;
          }
        } catch (err) {
          console.warn(`Failed to fetch ${url}: ${err.message}`);
        }
      }
      console.error('Could not retrieve currency data from any endpoint.');
    }

    fetchWithFallback(endpoints);
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
