const express = require('express');
const parseHL7 = require('./hl7Parser');
const hl7ToFhir = require('./hl7ToFhir');

const app = express();
app.use(express.json());  // Ensure the JSON middleware is applied

// POST endpoint to convert HL7 to FHIR
app.post('/hl7-to-fhir', (req, res) => {
  const hl7Message = req.body.hl7Message;
  console.log("Received HL7 Message:", hl7Message);

  if (!hl7Message) {
    console.error("No HL7 message found in the request body");
    return res.status(400).json({ error: 'Invalid HL7 message' });  // Client error: missing HL7 message
  }

  try {
    const hl7Data = parseHL7(hl7Message);
    console.log("Parsed HL7 Data:", hl7Data);

    const fhirData = hl7ToFhir(hl7Data);
    console.log("Converted FHIR Data:", fhirData);

    res.json(fhirData);  // Successful response
  } catch (error) {
    console.error("Error during conversion:", error);  // Log the error stack for better debugging
    res.status(500).json({ error: 'Conversion error' });  // Return 500 Internal Server Error
  }
});

// Export the app for testing
module.exports = app;
