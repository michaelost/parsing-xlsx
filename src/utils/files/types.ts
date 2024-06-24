export enum HeaderColumn {
  Customer = 'Customer',
  CustNo = "Cust No'",
  ProjectType = 'Project Type',
  Quantity = 'Quantity',
  PricePerItem = 'Price Per Item',
  ItemPriceCurrency = 'Item Price Currency',
  TotalPrice = 'Total Price',
  InvoiceCurrency = 'Invoice Currency',
  Status = 'Status',
  InvoiceNo = 'Invoice #',
  ContractComments = 'Contract Comments',
}

export const HEADER_COLUMNS = Object.values(HeaderColumn);

export type SheetRow = {
  [key: string]: string | number | undefined;
};

export type Sheet = SheetRow[];

export interface CurrencyRates {
  [currency: string]: number;
}

export interface FormattedData {
  date: string;
  currencyRates: CurrencyRates;
  items: any[];
}
