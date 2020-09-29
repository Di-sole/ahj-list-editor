/* eslint-disable no-param-reassign */
import redrawProductList from './redrawProductList';
import Modal from './Modal';
import Data from './Data';

const addBtn = document.querySelector('.add-btn');
const list = document.querySelector('.product-list');
const inputEl = document.querySelectorAll('.input');
const formEl = document.forms.form;
const saveBtn = formEl.elements.save;
const cancelBtn = formEl.elements.cancel;
const modal = new Modal(formEl);
const data = new Data();

redrawProductList(data.products, list);

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  data.productForEdit = null;
  modal.showModal();
});

list.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('edit-btn')) {
    const name = e.target.closest('.product-row').dataset.productName;
    data.productForEdit = name;

    const i = data.findProductIndex(name);
    formEl.elements.name.value = data.products[i].name;
    formEl.elements.cost.value = data.products[i].cost;
    modal.showModal();
  }

  if (e.target.classList.contains('delete-btn')) {
    const name = e.target.closest('.product-row').dataset.productName;
    data.deleteProduct(name);
    redrawProductList(data.products, list);
  }
});

saveBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (formEl.checkValidity()) {
    const name = formEl.elements.name.value;
    const cost = formEl.elements.cost.value;

    data.editProductList(data.productForEdit, name, cost);
    redrawProductList(data.products, list);
    formEl.reset();
    modal.hideModal();
  } else {
    const invalidEl = [...formEl.elements].find((o) => !o.validity.valid);
    invalidEl.focus();
    modal.showError(invalidEl);
  }
});

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.hideModal();
  modal.hideError();
  formEl.reset();
});

inputEl.forEach((el) => {
  el.addEventListener('input', () => {
    modal.hideError();
  });
});
