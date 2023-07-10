import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { pizzaPrice } from '@/common/helpers/pizza-price';
import { prepareData } from './../helpers/prepare-data';

describe('Test pizza price', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    prepareData();
  });

  it('Should return price of the pizza', () => {
    const pizza = {
      name: 'Test Pizza',
      sauceId: 1, // 50
      doughId: 1, // 300
      sizeId: 1, // 23 => 1x
      ingredients: [
        {
          ingredientId: 1,
          quantity: 1,
        }, // 33 * 1
        {
          ingredientId: 3,
          quantity: 2,
        }, // 42 * 2
      ],
    };

    const result = pizzaPrice(pizza);
    expect(result).toBe(467);
  });
});
