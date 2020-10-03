export default class Modal {
  constructor(formEl) {
    this.formEl = formEl;
    this.errorMessage = '';
  }

  showModal() {
    this.formEl.classList.remove('hidden');

    const parentEl = this.formEl.offsetParent;
    this.formEl.style.top = `${parentEl.offsetTop}px`;
    this.formEl.style.left = `${(parentEl.offsetWidth - this.formEl.offsetWidth) / 2}px`;
  }

  hideModal() {
    this.formEl.classList.add('hidden');
    this.formEl.style.top = '';
    this.formEl.style.left = '';
  }

  showError(input) {
    if (input.validity.valueMissing) {
      this.errorMessage = 'Заполните это поле';
    }

    if (input.validity.rangeUnderflow) {
      this.errorMessage = 'Стоимость должна быть больше 0';
    }

    if (input.validity.badInput) {
      this.errorMessage = 'Стоимость должна быть числом';
    }

    const errorEl = document.createElement('p');
    errorEl.className = 'error-message';
    errorEl.textContent = this.errorMessage;

    input.insertAdjacentElement('afterend', errorEl);
  }

  hideError() {
    const errorEl = this.formEl.querySelector('.error-message');

    if (errorEl) {
      errorEl.remove();
    }
  }
}
