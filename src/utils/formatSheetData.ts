interface FormattedData {
  [key: string]: any;
}

export const formatSheetData = (sheet: any[]): FormattedData[] => {
  if (sheet.length < 2) {
    return [];
  }

  // Identify the header row
  const headerRow = sheet.find(row => row['Sep 2023'] === 'Customer');
  if (!headerRow) {
    throw new Error('Header row not found');
  }

  // Identify the header keys
  const headerKeys = Object.keys(headerRow);

  // Start processing from the row after the header
  const startIndex = sheet.indexOf(headerRow) + 1;

  // Initialize an array to store formatted data
  const formattedData: FormattedData[] = [];

  // Process each row after the header row
  for (let i = startIndex; i < sheet.length; i++) {
    const row = sheet[i];

    // Check if the row is an end marker
    if (headerKeys.every(key => row[key] === '')) {
      break;
    }

    // Map the row to the header keys
    const formattedRow: FormattedData = {};
    for (const key of headerKeys) {
      formattedRow[headerRow[key]] = row[key];
    }

    // Add the formatted row to the array
    formattedData.push(formattedRow);
  }

  return formattedData;
};
