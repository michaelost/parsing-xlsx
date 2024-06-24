import { checkInvoiceDateMatches } from './genericValidation';

describe('checkInvoiceDateMatches', () => {
  const testCases = [
    ['2023-09', 'Sep 2023', true],
    ['2024-06', 'Jun 2024', true],
    ['2024-06', 'Jul 2024', false],
    ['2024-06', 'Jun 2023', false],
    ['2023-12', 'Dec 2023', true],
    ['2023-12', 'Nov 2023', false],
  ];

  it.each(testCases)('when invoiceDate is %s and fileDate is %s should return %s', (invoiceDate, fileDate, expected) => {
    expect(checkInvoiceDateMatches(invoiceDate as string, fileDate as string)).toBe(expected);
  });
});
