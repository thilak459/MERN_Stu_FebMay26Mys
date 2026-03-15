let payroll=[
    {name: "Asha", basePay: 30000, bonus: 2000, taxRate: 0.1 },
    {name: "Vishnu", basePay: 20000, bonus: 1000, taxRate:0.3},
    {name: "Manoj", basePay:-1000, bonus:500,taxRate:0.1},
    {name: "Puneeth", basePay: 25000, bonus:1500,taxRate:1.5}
];
let validRecords = payroll.filter(emp => emp.basePay > 0 && 
  emp.bonus >= 0 && 
  emp.taxRate >= 0 && emp.taxRate <= 1
);

let netPayReport = validRecords.map(emp=>{
    let gross= emp.basePay+emp.bonus;
    let netPay= gross-(gross*emp.taxRate);
    return {name:emp.name, netPay:netPay}
});

let totalNetPayout = netPayReport.reduce((total,emp)=>{
    return total+emp.netPay;
},0);

console.log("Valied records:",validRecords);
console.log("NetPay report",netPayReport);
console.log("Total net payout:",totalNetPayout);