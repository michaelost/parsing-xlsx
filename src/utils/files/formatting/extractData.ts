import { HEADER_COLUMNS, HeaderColumn } from '../types';
import { Indexes } from './detectIndexes';
import { Sheet } from '../types';
import { CurrencyRates } from '../types';

export function extractDate(sheet: Sheet, indexes: Indexes): string {
  const firstColumnKey = Object.keys(sheet[0])[0];
  return firstColumnKey;
}

export function extractCurrencyRates(sheet: Sheet, indexes: Indexes): CurrencyRates {
  const firstColumnKey = Object.keys(sheet[0])[0];
  const currencyRates: CurrencyRates = {};

  for (let i = indexes.currencyRatesStartIndex; i <= indexes.currencyRatesEndIndex; i++) {
    const row = sheet[i];
    const firstColumnValue = row[firstColumnKey];
    if (typeof firstColumnValue === 'string' && firstColumnValue.includes('Rate')) {
      const currency = firstColumnValue.split(' ')[0];
      const rate = row[Object.keys(row)[1]];
      if (rate) {
        currencyRates[currency] = rate as number;
      }
    }
  }

  return currencyRates;
}

export function extractItems(sheet: Sheet, indexes: Indexes): any[] {
  const headerRow = sheet[indexes.headerIndex];
  const items: any[] = [];

  for (let i = indexes.dataStartIndex; i < indexes.dataEndIndex; i++) {
    const row = sheet[i];

    // Map the row to the header keys
    const formattedRow: any = {};
    for (const key of Object.keys(headerRow)) {
      const headerValue = headerRow[key];
      if (HEADER_COLUMNS.includes(headerValue as HeaderColumn)) {
        formattedRow[headerValue] = row[key];
      }
    }

    items.push(formattedRow);
  }

  return items;
}
