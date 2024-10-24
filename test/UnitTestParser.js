const assert = require('chai').assert;
const parseHL7 = require('../hl7Parser');

describe('HL7 Parser', () => {
  it('should correctly parse patient data', () => {
    const message = `MSH|^~\\&|HIS|Hospital||Clinic|20241020101010||ADT^A01|123456|P|2.4
    PID|1||12345^^^Hospital^MR||Doe^John||19900101|M|||`;

    const patientData = parseHL7(message);
    assert.equal(patientData.id, '12345');
    assert.equal(patientData.name, 'Doe^John');
    assert.equal(patientData.dob, '19900101');
  });
});
