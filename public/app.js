async function loadAccount() {
  const res = await fetch("/api/account");
  const data = await res.json();

  document.getElementById("owner").textContent = data.owner;
  document.getElementById("balance").textContent = data.balance;
  document.getElementById("rate").textContent = data.interestRate;

  const list = document.getElementById("transactions");
  list.innerHTML = "";
  data.transactions.forEach(tx => {
    const li = document.createElement("li");
    li.textContent = `${tx.date} - ${tx.type.toUpperCase()} - $${tx.amount}`;
    list.appendChild(li);
  });
}

async function deposit() {
  const amount = Number(document.getElementById("amount").value);
  await fetch("/api/deposit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount })
  });
  loadAccount();
}

async function withdraw() {
  const amount = Number(document.getElementById("amount").value);
  const res = await fetch("/api/withdraw", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount })
  });

  if (!res.ok) {
    alert("Insufficient funds");
  }
  loadAccount();
}

async function calculateInterest() {
  const res = await fetch("/api/interest");
  const data = await res.json();
  document.getElementById("interest").textContent =
    `Estimated Interest: $${data.interest.toFixed(2)}`;
}

loadAccount();
