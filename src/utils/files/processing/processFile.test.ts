import { calculateInvoiceTotal } from './processFile';

import { CurrencyRates, HeaderColumn } from '../types';

describe('calculateInvoiceTotal', () => {
  const currencyRates: CurrencyRates = {
    USD: 1.0,
    EUR: 0.85,
  };

  const validCurrencyItem = {
    [HeaderColumn.TotalPrice]: 100,
    [HeaderColumn.InvoiceCurrency]: 'EUR',
    [HeaderColumn.ItemPriceCurrency]: 'USD',
  };

  const invalidCurrencyItem = {
    [HeaderColumn.TotalPrice]: 100,
    [HeaderColumn.InvoiceCurrency]: 'GBP',
    [HeaderColumn.ItemPriceCurrency]: 'USD',
  };

  it('should return the converted total price when invoice currency is among the currency rates', () => {
    const result = calculateInvoiceTotal(validCurrencyItem, currencyRates);
    expect(result).toBe(85);
  });

  it('should return null when invoice currency is not among the currency rates', () => {
    const result = calculateInvoiceTotal(invalidCurrencyItem, currencyRates);
    expect(result).toBeNull();
  });
});
