const express = require('express');
const multer = require('multer');

const app = express();
const PORT = 3002;

// Initialize multer storage to memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file'); // 'file' is the name attribute of the file input

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Upload endpoint
app.post('/files', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }
    // Return file metadata and content
    res.status(200).json({
      message: 'File read successfully!',
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      content: req.file.buffer.toString('utf-8'),
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
