const request = require('supertest');
const app = require('C:/Pascal/VisualCodeProjects/JavaScriptWorkspace/HL7_To_FHIR/server.js');
const assert = require('chai').assert;

describe('POST /hl7-to-fhir', () => {
  it('should convert HL7 to FHIR format', async () => {
    const hl7Message = `MSH|^~\\&|HIS|Hospital||Clinic|20241020101010||ADT^A01|123456|P|2.4
    PID|1||12345^^^Hospital^MR||Doe^John||19900101|M|||`;

    const res = await request(app)
      .post('/hl7-to-fhir')
      .send({ hl7Message })  // Send as JSON object
      .expect('Content-Type', /json/)  // Expect a JSON response
      .expect(200);  // Expect 200 OK status

    assert.equal(res.body.resourceType, "Patient");
    assert.equal(res.body.id, '12345');
    assert.equal(res.body.name[0].family, 'Doe');
  });
});
