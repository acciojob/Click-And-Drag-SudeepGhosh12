// Your code here.
const container = document.getElementById('container');
const items = Array.from(container.querySelectorAll('.item'));
const containerRect = container.getBoundingClientRect();

items.forEach((item, index) => {
  // Position each cube in a grid manually using absolute positioning
  const row = Math.floor(index / 5);
  const col = index % 5;
  const spacing = 20;
  const size = 100;

  item.style.left = `${col * (size + spacing)}px`;
  item.style.top = `${row * (size + spacing)}px`;

  let offsetX = 0, offsetY = 0, isDragging = false;

  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    item.classList.add('dragging');
    const rect = item.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;

    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    // Boundaries
    newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - item.clientWidth));
    newTop = Math.max(0, Math.min(newTop, container.clientHeight - item.clientHeight));

    item.style.left = `${newLeft}px`;
    item.style.top = `${newTop}px`;
  }

  function onMouseUp() {
    isDragging = false;
    item.classList.remove('dragging');
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
});