import { Product } from './product.interface';
import { faker } from '@faker-js/faker';
export function generateOneProduct(): Product {
  return {
    id: parseInt(faker.string.uuid()),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    category: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    qty: faker.number.int({ min: 1 }),
    subTotal: 0,
    rating: {
      rate: faker.number.int({ min: 1 }),
      count: faker.number.int({ min: 1 }),
    },
  };
}

export function generateManyProducts(size = 10): Product[] {
  const products: Product[] = [];
  for (let i = 0; i < size; i++) {
    products.push(generateOneProduct());
  }
  return [...products];
}
