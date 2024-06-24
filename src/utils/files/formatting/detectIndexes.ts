import { HEADER_COLUMNS } from '../types';

export interface Indexes {
  dateIndex: number;
  currencyRatesStartIndex: number;
  currencyRatesEndIndex: number;
  headerIndex: number;
  dataStartIndex: number;
  dataEndIndex: number;
}

export function detectIndexes(sheet: any[]): Indexes {
  const firstColumnKey = Object.keys(sheet[0])[0];

  const dateIndex = 0;

  let currencyRatesStartIndex = -1;
  let currencyRatesEndIndex = -1;
  let headerIndex = -1;
  let dataStartIndex = -1;
  let dataEndIndex = sheet.length;

  for (let i = 0; i < sheet.length; i++) {
    const row = sheet[i];
    const firstColumnValue = row[firstColumnKey];

    if (currencyRatesStartIndex === -1 && typeof firstColumnValue === 'string' && firstColumnValue.includes('Rate')) {
      currencyRatesStartIndex = i;
    }

    if (currencyRatesStartIndex !== -1 && HEADER_COLUMNS.includes(firstColumnValue)) {
      currencyRatesEndIndex = i - 1;
      headerIndex = i;
      dataStartIndex = i + 1;
    }

    if (Object.values(row).includes('Total (No VAT)')) {
      dataEndIndex = i;
      break;
    }
  }

  if (currencyRatesStartIndex === -1 || headerIndex === -1) {
    throw new Error('Required sections not found');
  }

  return {
    dateIndex,
    currencyRatesStartIndex,
    currencyRatesEndIndex,
    headerIndex,
    dataStartIndex,
    dataEndIndex,
  };
}
