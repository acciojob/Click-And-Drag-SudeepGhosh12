const container = document.getElementById('container');
const items = Array.from(container.querySelectorAll('.item'));

const spacing = 20;
const size = 100;

// Initial placement in grid using absolute positioning
items.forEach((item, index) => {
  const row = Math.floor(index / 5);
  const col = index % 5;
  item.style.left = `${col * (size + spacing)}px`;
  item.style.top = `${row * (size + spacing)}px`;
});

let selected = null;
let offsetX = 0, offsetY = 0;

container.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('item')) {
    selected = e.target;
    selected.classList.add('dragging');
    
    const rect = selected.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
});

function onMouseMove(e) {
  if (!selected) return;

  const containerRect = container.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Enforce boundary limits
  newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - selected.clientWidth));
  newTop = Math.max(0, Math.min(newTop, container.clientHeight - selected.clientHeight));

  selected.style.left = `${newLeft}px`;
  selected.style.top = `${newTop}px`;
}

function onMouseUp() {
  if (selected) {
    selected.classList.remove('dragging');
    selected = null;
  }

  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}