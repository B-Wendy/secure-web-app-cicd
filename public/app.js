async function fetchMessages() {
  const res = await fetch('/api/messages');
  const json = await res.json();
  const container = document.getElementById('messages');
  container.innerHTML = '';
  if (!json.messages || json.messages.length === 0) {
    container.textContent = 'No messages yet.';
    return;
  }
  json.messages.slice().reverse().forEach(m => {
    const d = document.createElement('div');
    d.className = 'msg';
    d.textContent = m.text;
    container.appendChild(d);
  });
}

document.getElementById('send').addEventListener('click', async () => {
  const txt = document.getElementById('text').value.trim();
  if (!txt) return alert('Type something first');
  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ text: txt })
  });
  if (!res.ok) {
    const j = await res.json().catch(()=>({error:'unknown'}));
    return alert('Error: ' + (j.error || res.status));
  }
  document.getElementById('text').value = '';
  fetchMessages();
});

fetchMessages();
