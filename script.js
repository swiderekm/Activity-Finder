const renderBtn   = document.querySelector('#render');
const dropdown    = document.querySelector('#dropdown');
const isFree      = document.querySelector('#isFree');
const container   = document.querySelector('#container');
const selectedRadio = document.querySelector('input[name="numbers"]:checked');
function getParticipants() {
  const selected = document.querySelector('input[name="numbers"]:checked');
  return selected ? selected.value : '';
}

const fetchAndShowActivity = async () => {
    const base = 'https://bored.api.lewagon.com/api/activity';
    const params = new URLSearchParams;
    
    let participants = getParticipants();
    if (participants !== 'any') {
        params.append('participants', participants);
    }

    let type = dropdown.value;
    if (dropdown.value !== 'any') {
        params.append('type', type);
    }

    if (isFree.checked) {
        params.append('price', '0');
    }

    const newUrl = `${base}?${params.toString()}`

    const response = await fetch(newUrl);
    activity = await response.json();

    if (activity.error) {
        container.innerHTML = `<p>No results...</p>`;
        return;
    }

    container.innerHTML = `
      <h3>${activity.activity}</h3>
      <p><strong>Type:</strong> ${activity.type}</p>
      <p><strong>Participants:</strong> ${activity.participants}</p>
      <p><strong>Price:</strong> ${activity.price === 0 ? 'FREE' : (activity.price * 100).toFixed(0) + '$'}</p>
      ${activity.link ? `<p><a href="${activity.link}" target="_blank" rel="noopener">more info</a></p>` : ''}
      <p><small>Accessibility: ${activity.accessibility}</small></p>
    `;
}
renderBtn.addEventListener('click', fetchAndShowActivity);