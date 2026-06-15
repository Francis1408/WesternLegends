// Renders custom notification window
export function showNotification({ title, content, buttons }) {

  const overlay  = document.getElementById('notification_overlay');
  const titleEl  = document.getElementById('notification_title');
  const contentEl = document.getElementById('notification_content');
  const buttonsEl = document.getElementById('notification_buttons');

  titleEl.textContent  = title;
  contentEl.innerHTML  = content;
  buttonsEl.innerHTML  = '';

  buttons.forEach(({ label, style = 'primary', onClick }) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.dataset.style = style;
    btn.addEventListener('click', () => {
      closeNotification();
      onClick?.();
    });
    buttonsEl.appendChild(btn);
  });

  overlay.classList.remove('hidden');
}

export function closeNotification() {
  document.getElementById('notification_overlay').classList.add('hidden');
}