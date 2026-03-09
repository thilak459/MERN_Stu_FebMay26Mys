function invoice(gstRate = 0.18, ...items) {
  let subtotal = 0;

  for (const item of items) {
    if (item.name === "STOP") break;

    const isValid = item.price > 0 && item.qty > 0 && 
                    typeof item.price === 'number' && 
                    typeof item.qty === 'number';

    if (!isValid) continue;

    subtotal += item.price * item.qty;
  }

  const gst = subtotal * gstRate;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    gst: Number(gst.toFixed(2)),
    total: Number((subtotal + gst).toFixed(2))
  };
}

const result = invoice(0.18, 
  { name: "Pen", price: 10, qty: 3 }, 
  { name: "Paper", price: 5, qty: 10 },
  { name: "Invalid", price: -5, qty: 2 }, 
  { name: "STOP" },                    
  { name: "Notebook", price: 100, qty: 1 } 
);

console.log(result);