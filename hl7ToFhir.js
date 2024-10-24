function hl7ToFhir(hl7Data) {
  return {
    resourceType: "Patient",
    id: hl7Data.id || "",
    name: [{
      family: hl7Data.name ? hl7Data.name.split("^")[0] : "",
      given: hl7Data.name ? [hl7Data.name.split("^")[1]] : [""]
    }],
    birthDate: hl7Data.dob || ""
  };
}

module.exports = hl7ToFhir;
