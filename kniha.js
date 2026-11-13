const URL = 'https://script.google.com/macros/s/AKfycbykLfPeHZW23ttKW6OguNUnh5HCkDTFEELq1onFyOY7t7S0V1NkOmtFCHprdXeWlz52/exec';

// Bezpečná funkce pro escapování HTML znaků a uvozovek
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Odeslání nového vzkazu
document.getElementById('f').onsubmit = e => {
  e.preventDefault();
  
  const btn = e.target.querySelector('button');
  if (btn.disabled) return; 
  btn.disabled = true;

  fetch(URL, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      name: document.getElementById('n').value,
      text: document.getElementById('t').value
    })
  }).then(() => {
    setTimeout(() => location.reload(), 3000);
  });
};

// Stažení a zobrazení vzkazů při načtení stránky
fetch(URL)
  .then(res => res.json())
  .then(data => {
    document.getElementById('seznam').innerHTML = data.map(v => `
      <p><b>${escapeHtml(v.name)}</b> <small>(${new Date(v.time).toLocaleString()})</small><br>${escapeHtml(v.text)}</p>
    `).join('');
  });