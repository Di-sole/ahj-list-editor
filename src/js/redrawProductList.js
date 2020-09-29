/* eslint-disable no-param-reassign */
export default function redrawProductList(products, container) {
  container.innerHTML = '';

  const headerRow = document.createElement('tr');
  headerRow.className = 'header-row';
  headerRow.innerHTML = `
    <td>Название</td>
    <td>Стоимость</td>
    <td>Действия</td>
  `;
  container.appendChild(headerRow);

  const editBtn = `<button class="btn small-btn edit-btn">${String.fromCharCode(0x270E)}</button>`;
  const deleteBtn = `<button class="btn small-btn delete-btn">${String.fromCharCode(0x2A2F)}</button>`;

  products.forEach((o) => {
    const el = document.createElement('tr');
    el.className = 'product-row';
    el.dataset.productName = `${o.name}`;
    el.innerHTML = `
      <td>${o.name}</td>
      <td>${o.cost}</td>
      <td>${editBtn} ${deleteBtn}</td>
    `;

    container.appendChild(el);
  });
}
