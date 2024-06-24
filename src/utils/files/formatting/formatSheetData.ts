import { detectIndexes, Indexes } from './detectIndexes';
import { extractDate, extractCurrencyRates, extractItems } from './extractData';
import { Sheet } from '../types';
import { FormattedData } from '../types';

export function formatSheetData(sheet: Sheet): FormattedData {
  const indexes: Indexes = detectIndexes(sheet);

  const date = extractDate(sheet, indexes);
  const currencyRates = extractCurrencyRates(sheet, indexes);
  const items = extractItems(sheet, indexes);

  return {
    date,
    currencyRates,
    items,
  };
}
