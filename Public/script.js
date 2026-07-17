const form = document.getElementById('entry-form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const idInput = document.getElementById('entry-id');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const entriesList = document.getElementById('entries-list');

document.addEventListener('DOMContentLoaded', loadEntries);

async function loadEntries() {
  const res = await fetch('/api/entries');
  const entries = await res.json();

  entriesList.innerHTML = '';

  entries.slice().reverse().forEach(entry => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `
      <h3>${escapeHtml(entry.title)}</h3>
      <div class="date">${entry.date}</div>
      <p>${escapeHtml(entry.content)}</p>
      <div class="entry-actions">
        <button class="edit-btn" data-id="${entry.id}">Edit</button>
        <button class="delete-btn" data-id="${entry.id}">Delete</button>
      </div>
   ` ;
    entriesList.appendChild(div);
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => startEdit(btn.dataset.id, entries));
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteEntry(btn.dataset.id));
  });
}

function startEdit(id, entries) {
  const entry = entries.find(e => String(e.id) === id);
  if (!entry) return;

  idInput.value = entry.id;
  titleInput.value = entry.title;
  contentInput.value = entry.content;
  submitBtn.textContent = 'Save Changes';
  cancelBtn.style.display = 'inline-block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
  idInput.value = '';
  form.reset();
  submitBtn.textContent = 'Add Entry';
  cancelBtn.style.display = 'none';
}

cancelBtn.addEventListener('click', resetForm);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const id = idInput.value;

  if (!title || !content) return;

  if (id) {
    await fetch(`/api/entries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
  } else {
    await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
  }

  resetForm();
  loadEntries();
});

async function deleteEntry(id) {
  if (!confirm('Delete this entry?')) return;

  await fetch(`/api/entries/${id}`, { method: 'DELETE' });
  loadEntries();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}