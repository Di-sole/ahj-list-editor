import Data from '../Data';

const data = new Data();

test('добавление нового товара', () => {
  data.addProduct('iPhone XR', '20000');
  data.addProduct('Samsung Galaxy', '40000');
  const expected = [
    {
      name: 'iPhone XR',
      cost: 20000,
    },
    {
      name: 'Samsung Galaxy',
      cost: 40000,
    },
  ];

  expect(data.products).toEqual(expected);
});

test('поиск индекса нужного товара', () => {
  const index = data.findProductIndex('iPhone XR');

  expect(index).toBe(0);
});

test('редактирование товара', () => {
  data.editProduct(0, 'iPhone', '60000');
  const expected = [
    {
      name: 'iPhone',
      cost: 60000,
    },
    {
      name: 'Samsung Galaxy',
      cost: 40000,
    },
  ];

  expect(data.products).toEqual(expected);
});

test('удаление товара', () => {
  data.deleteProduct('iPhone');
  const expected = [
    {
      name: 'Samsung Galaxy',
      cost: 40000,
    },
  ];

  expect(data.products).toEqual(expected);
});
