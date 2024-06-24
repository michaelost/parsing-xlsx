import { HeaderColumn, CurrencyRates } from '../types';
import { validateFields } from '../validation/validateInvoiceFields';
import { FormattedData } from '../types';

interface InvoiceData {
  [key: string]: any;
  validationErrors?: string[];
  InvoiceTotal?: number;
}

export interface ProcessedFile {
  InvoicingMonth: string;
  currencyRates: { [key: string]: number };
  invoicesData: InvoiceData[];
}

export function calculateInvoiceTotal(item: { [key: string]: any }, currencyRates: CurrencyRates): number {
  const totalPrice = item[HeaderColumn.TotalPrice];
  const invoiceCurrency = item[HeaderColumn.InvoiceCurrency];
  const itemPriceCurrency = item[HeaderColumn.ItemPriceCurrency];

  if (invoiceCurrency && itemPriceCurrency && currencyRates[invoiceCurrency] && currencyRates[itemPriceCurrency]) {
    const conversionRate = currencyRates[invoiceCurrency] / currencyRates[itemPriceCurrency];
    return totalPrice * conversionRate;
  }

  return null;
}

export function processFile(result: FormattedData, invoiceDate: string): ProcessedFile {
  const { date, currencyRates, items } = result;
  const relevantItems = items.filter(item => item[HeaderColumn.Status]?.toLowerCase() === 'ready' || item[HeaderColumn.InvoiceNo]);

  const invoicesData: InvoiceData[] = relevantItems.map(item => {
    const validationErrors = validateFields(item, currencyRates);
    const invoiceTotal = calculateInvoiceTotal(item, currencyRates);
    return {
      ...item,
      InvoiceTotal: invoiceTotal,
      validationErrors,
    };
  });

  return {
    InvoicingMonth: date,
    currencyRates,
    invoicesData,
  };
}
