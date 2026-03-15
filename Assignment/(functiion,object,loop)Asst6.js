function auditReport(reportJSON) {
  const report = JSON.parse(reportJSON);
  const modules = report.modules;

  let okCount = 0;
  let failCount = 0;

  const moduleNames = Object.keys(modules);

  for (let i = 0; i < moduleNames.length; i++) {
    const status = modules[moduleNames[i]];

    if (status === "OK") {
      okCount++;
    } else if (status === "FAIL") {
      failCount++;
      break;
    }
  }

  const summary = {
    okCount: okCount,
    failCount: failCount
  };

  return {
    summary: summary,
    summaryJSON: JSON.stringify(summary)
  };
}
const reportData = `{
  "app": "Portal",
  "status": "OK",
  "modules": {
    "auth": "OK",
    "payment": "OK",
    "results": "FAIL",
    "profile": "OK"
  }
}`;

const result = auditReport(reportData);

console.log("Summary Object:", result.summary);
console.log("Summary JSON:", result.summaryJSON);