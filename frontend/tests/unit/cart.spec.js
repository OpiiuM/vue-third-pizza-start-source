import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from '@/stores/cart';
import { prepareData } from './../helpers/prepare-data';

describe('Test cart store', () => {
  let cartStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    prepareData();
    cartStore = useCartStore();
  });

  it('Should return cart total', () => {
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

    const misc = [
      {
        miscId: 1,
        quantity: 1,
      },
      {
        miscId: 2,
        quantity: 2,
      },
    ];

    cartStore.pizzas = [
      {
        quantity: 1,
        ...pizza,
      },
    ];

    cartStore.misc = misc;

    const result = cartStore.total;
    expect(result).toBe(583);
  });
});
