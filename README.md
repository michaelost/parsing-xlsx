# Invoice Processing Service

This project is an Express-based API for uploading and processing XLS files containing invoice data. It includes robust validation and error handling to ensure data integrity and correctness. Key features include:

- **File Upload Endpoint**: Allows users to upload XLS files with invoice data.
- **Data Validation**: Checks for mandatory fields, validates total prices, and verifies invoice dates against provided data.
- **Currency Conversion**: Calculates invoice totals in specified currencies using provided exchange rates.
- **Error Handling**: Returns appropriate HTTP status codes and error messages for various validation failures.
- **Extensive Unit Testing**: Comprehensive tests using Jest to ensure the reliability and accuracy of the service.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/invoice-processing-service.git
    cd invoice-processing-service
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    ```bash
    npm start
    ```

The server will start on `http://localhost:3000`.

### Development

To start the server with file watching and auto-reloading, use:

```bash
npm run dev
```

## API Endpoint

### POST /files

#### Description

Uploads an XLS file containing invoice data for processing. Validates the data, performs necessary calculations, and returns the processed information or appropriate error messages.

#### Request

- **URL**: `http://localhost:3000/files?invoicingMonth=YYYY-MM`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: multipart/form-data`
- **Body**:
  - `file`: The XLS file to be uploaded.

#### Example

```bash
curl -X POST "http://localhost:3000/files?invoicingMonth=2023-09" \
  -F 'file=@/path/to/your/invoice-file.xls'
```

#### Response

- **200 OK**: Successfully processed the file.
  ```json
  {
    "message": "File uploaded and processed successfully",
    "data": {
      "InvoicingMonth": "Sep 2023",
      "currencyRates": {
        "USD": 1.0,
        "EUR": 0.85
      },
      "invoicesData": [
        {
          "Customer": "Customer1",
          "Cust No": 12345,
          "Project Type": "Project1",
          "Quantity": 10,
          "Price Per Item": 15,
          "Item Price Currency": "USD",
          "Total Price": 150,
          "Invoice Currency": "USD",
          "Status": "Ready",
          "Invoice #": "INV001",
          "Contract Comments": "No comments",
          "InvoiceTotal": 150,
          "validationErrors": []
        }
      ]
    }
  }
