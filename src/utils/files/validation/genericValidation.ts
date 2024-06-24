import { isSameMonth, parse } from 'date-fns';
import { FormattedData, CurrencyRates } from '../types';

export function checkInvoiceDateMatches(invoiceDate: string, fileDate: string): boolean {
  const [invoiceYear, invoiceMonth] = invoiceDate.split('-').map(el => parseInt(el.replace(/\D/g, '')));
  const invoiceDateParsed = new Date(invoiceYear, invoiceMonth - 1);
  const fileDateParsed = parse(fileDate, 'MMM yyyy', new Date());
  return isSameMonth(invoiceDateParsed, fileDateParsed);
}

export function checkCurrencyRatesExist(currencyRates: CurrencyRates): boolean {
  return Object.keys(currencyRates).length > 0;
}

export function genericValidation(invoiceDate: string, result: FormattedData): string[] {
  const errors: string[] = [];

  if (!checkInvoiceDateMatches(invoiceDate, result.date)) {
    errors.push('Invoice date does not match the date in the file.');
  }

  if (!checkCurrencyRatesExist(result.currencyRates)) {
    errors.push('At least one currency rate must be present.');
  }

  return errors;
}
