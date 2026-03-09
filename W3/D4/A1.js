let queue=[{ id: "T101", priority: "HIGH",resolved: true}, 
           { id: "T102", priority: "MEDIUM",resolved: false},
           { id: "T103", priority: "LOW",resolved: true},
           { id: "T104", priority: "HIGH",resolved: true},
           { id: "T105", priority: "LOW",resolved: false}
];
let newUrgentTicket=queue.unshift({id:"T100",priority:"High",resolved:false});
queue.push(
  { id: "T106", priority: "MEDIUM", resolved: false },
  { id: "T107", priority: "MEDIUM", resolved: false }
);
let currentTicket=queue.shift();

let droppedTicket=queue.pop();

let pending = queue.filter(ticket => !ticket.resolved);

let pendingIds = pending.map(ticket => ticket.id);

console.log("Current tickets:",currentTicket);
console.log("Dropped ID:",droppedTicket);
console.log("Pending:",pending);
console.log("Pending ID:",pendingIds);