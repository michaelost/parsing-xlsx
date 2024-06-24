import { checkMandatoryFields, checkTotalPrice, checkInvoiceCurrency } from './validateInvoiceFields';
import { HeaderColumn, CurrencyRates } from '../types';

describe('checkMandatoryFields', () => {
  const fullItem = {
    [HeaderColumn.Customer]: 'Customer1',
    [HeaderColumn.CustNo]: 12345,
    [HeaderColumn.ProjectType]: 'Project1',
    [HeaderColumn.Quantity]: 10,
    [HeaderColumn.PricePerItem]: 15,
    [HeaderColumn.ItemPriceCurrency]: 'USD',
    [HeaderColumn.TotalPrice]: 150,
    [HeaderColumn.InvoiceCurrency]: 'USD',
    [HeaderColumn.Status]: 'Ready',
    [HeaderColumn.InvoiceNo]: 'INV001',
    [HeaderColumn.ContractComments]: 'No comments',
  };

  const missingOneFieldItem = {
    [HeaderColumn.Customer]: 'Customer1',
    [HeaderColumn.CustNo]: undefined,
    [HeaderColumn.ProjectType]: 'Project1',
    [HeaderColumn.Quantity]: 10,
    [HeaderColumn.PricePerItem]: 15,
    [HeaderColumn.ItemPriceCurrency]: 'USD',
    [HeaderColumn.TotalPrice]: 150,
    [HeaderColumn.InvoiceCurrency]: 'USD',
    [HeaderColumn.Status]: 'Ready',
    [HeaderColumn.InvoiceNo]: 'INV001',
    [HeaderColumn.ContractComments]: 'No comments',
  };

  const missingTwoFieldsItem = {
    [HeaderColumn.Customer]: 'Customer1',
    [HeaderColumn.CustNo]: undefined,
    [HeaderColumn.ProjectType]: 'Project1',
    [HeaderColumn.Quantity]: 10,
    [HeaderColumn.PricePerItem]: 15,
    [HeaderColumn.ItemPriceCurrency]: 'USD',
    [HeaderColumn.TotalPrice]: undefined,
    [HeaderColumn.InvoiceCurrency]: 'USD',
    [HeaderColumn.Status]: 'Ready',
    [HeaderColumn.InvoiceNo]: undefined,
    [HeaderColumn.ContractComments]: 'No comments',
  };

  it('should return an empty array when no mandatory field is missing', () => {
    const result = checkMandatoryFields(fullItem);
    expect(result).toEqual([]);
  });

  it('should return an array with one error message when one mandatory field is missing', () => {
    const result = checkMandatoryFields(missingOneFieldItem);
    expect(result).toEqual([`${HeaderColumn.CustNo} is a mandatory field.`]);
  });

  it('should return an array with two error messages when two mandatory fields are missing', () => {
    const result = checkMandatoryFields(missingTwoFieldsItem);
    expect(result).toEqual([`${HeaderColumn.CustNo} is a mandatory field.`, `${HeaderColumn.TotalPrice} is a mandatory field.`]);
  });
});

describe('checkTotalPrice', () => {
  const correctTotalPriceItem = {
    [HeaderColumn.Quantity]: 10,
    [HeaderColumn.PricePerItem]: 15,
    [HeaderColumn.TotalPrice]: 150,
  };

  const incorrectTotalPriceItem = {
    [HeaderColumn.Quantity]: 10,
    [HeaderColumn.PricePerItem]: 15,
    [HeaderColumn.TotalPrice]: 140,
  };

  it('should return an empty array when Total Price equals Price Per Item multiplied by Quantity', () => {
    const result = checkTotalPrice(correctTotalPriceItem);
    expect(result).toEqual([]);
  });

  it('should return an array with an error message when Total Price does not equal Price Per Item multiplied by Quantity', () => {
    const result = checkTotalPrice(incorrectTotalPriceItem);
    expect(result).toEqual(['Total Price does not equal Price Per Item multiplied by Quantity.']);
  });
});

describe('checkInvoiceCurrency', () => {
  const currencyRates: CurrencyRates = {
    USD: 1.0,
    EUR: 0.85,
  };

  const validCurrencyItem = {
    [HeaderColumn.InvoiceCurrency]: 'USD',
  };

  const invalidCurrencyItem = {
    [HeaderColumn.InvoiceCurrency]: 'GBP',
  };

  it('should return an empty array when Invoice Currency is in the provided currency rates', () => {
    const result = checkInvoiceCurrency(validCurrencyItem, currencyRates);
    expect(result).toEqual([]);
  });

  it('should return an array with an error message when Invoice Currency is not in the provided currency rates', () => {
    const result = checkInvoiceCurrency(invalidCurrencyItem, currencyRates);
    expect(result).toEqual([`Invoice Currency GBP is not in the provided currency rates.`]);
  });
});
