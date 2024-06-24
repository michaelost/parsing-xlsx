import { HeaderColumn, CurrencyRates } from '../types';

export function checkMandatoryFields(item: { [key: string]: any }): string[] {
  const mandatoryFields = [
    HeaderColumn.Customer,
    HeaderColumn.CustNo,
    HeaderColumn.ProjectType,
    HeaderColumn.Quantity,
    HeaderColumn.PricePerItem,
    HeaderColumn.ItemPriceCurrency,
    HeaderColumn.TotalPrice,
    HeaderColumn.InvoiceCurrency,
    HeaderColumn.Status,
  ];

  const errors: string[] = [];
  mandatoryFields.forEach(field => {
    if (!item[field]) {
      errors.push(`${field} is a mandatory field.`);
    }
  });

  return errors;
}

export function checkTotalPrice(item: { [key: string]: any }): string[] {
  const errors: string[] = [];
  if (item[HeaderColumn.TotalPrice] !== item[HeaderColumn.PricePerItem] * item[HeaderColumn.Quantity]) {
    errors.push('Total Price does not equal Price Per Item multiplied by Quantity.');
  }
  return errors;
}

export function checkInvoiceCurrency(item: { [key: string]: any }, currencyRates: CurrencyRates): string[] {
  const errors: string[] = [];
  if (!currencyRates[item[HeaderColumn.InvoiceCurrency]]) {
    errors.push(`Invoice Currency ${item[HeaderColumn.InvoiceCurrency]} is not in the provided currency rates.`);
  }
  return errors;
}

export function validateFields(item: { [key: string]: any }, currencyRates: CurrencyRates): string[] {
  const mandatoryFieldErrors = checkMandatoryFields(item);
  const totalPriceErrors = checkTotalPrice(item);
  const invoiceCurrencyErrors = checkInvoiceCurrency(item, currencyRates);

  return [...mandatoryFieldErrors, ...totalPriceErrors, ...invoiceCurrencyErrors];
}
