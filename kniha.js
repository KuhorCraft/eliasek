const URL = 'https://script.google.com/macros/s/AKfycbykLfPeHZW23ttKW6OguNUnh5HCkDTFEELq1onFyOY7t7S0V1NkOmtFCHprdXeWlz52/exec';

// Odeslání nového vzkazu (jméno + text)
document.getElementById('f').onsubmit = e => {
  e.preventDefault();
  fetch(URL, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      name: document.getElementById('n').value,
      text: document.getElementById('t').value
    })
  }).then(() => location.reload());
};

// Stažení a zobrazení vzkazů při načtení stránky
fetch(URL)
  .then(res => res.json())
  .then(data => {
    document.getElementById('seznam').innerHTML = data.map(v => `
      <p><b>${v.name}</b> <small>(${new Date(v.time).toLocaleString()})</small><br>${v.text}</p>
    `).join('');
  });