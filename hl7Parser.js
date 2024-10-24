function parseHL7(hl7Message) {
  const segments = hl7Message.split("\n").map(segment => segment.trim());
  const patientData = {};

  segments.forEach(segment => {
    const fields = segment.split("|");
    if (fields[0] === "PID") {
      patientData.id = fields[3] ? fields[3].split("^")[0] : undefined;
      patientData.name = fields[5] || "";
      patientData.dob = fields[7] || "";
    }
  });

  return patientData;
}

module.exports = parseHL7;
