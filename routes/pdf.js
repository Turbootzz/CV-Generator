// routes/pdf.js (not working yet)

const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs').promises;

// Helper function to render an EJS file
async function renderEJS(view, data) {
  const filePath = path.resolve(__dirname, `../public/views/partials/${view}.ejs`);
  return await ejs.renderFile(filePath, data);
}

router.get('/generate-pdf', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Read the content of the external stylesheet
  const stylesheetPath = path.resolve(__dirname, '../public/assets/css/template1.css');
  const stylesheetContent = await fs.readFile(stylesheetPath, 'utf-8');

  // Render the EJS template and add styles dynamically
  const ejsContent = await renderEJS('template1');
  await page.setContent(ejsContent);
  await page.addStyleTag({ content: stylesheetContent });

  // Wait for styles to be applied (adjust the selector accordingly)
  await page.waitForSelector('#your-div-id');

  // Generate PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  // Send the generated PDF as a response
  res.contentType('application/pdf');
  res.send(pdfBuffer);
});

module.exports = router;
