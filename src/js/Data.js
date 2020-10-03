export default class Data {
  constructor() {
    this.products = [];
    this.active = null;
  }

  get productForEdit() {
    return this.active;
  }

  set productForEdit(name) {
    this.active = name;
  }

  findProductIndex(name) {
    return this.products.findIndex((elem) => elem.name === name);
  }

  addProduct(newName, newCost) {
    const newProduct = {
      name: newName,
      cost: Number(newCost),
    };

    this.products.push(newProduct);
  }

  editProduct(index, newName, newCost) {
    this.products[index].name = newName;
    this.products[index].cost = Number(newCost);
  }

  deleteProduct(name) {
    const index = this.findProductIndex(name);
    this.products.splice(index, 1);
  }

  editProductList(name, newName, newCost) {
    const index = this.findProductIndex(name);

    if (index >= 0) {
      this.editProduct(index, newName, newCost);
    } else {
      this.addProduct(newName, newCost);
    }
  }
}
