import { defineStore } from 'pinia';
import resources from '@/services/resources';
import {
	normalizeDough,
	normalizeSize,
	normalizeIngredients,
	normalizeSauces,
} from '@/common/helpers/normalize';

export const useDataStore = defineStore('data', {
	state: () => ({
		doughs: [],
		ingredients: [],
		sauces: [],
		sizes: [],
		misc: [],
	}),
	getters: {
    isDataLoaded() {
      return (
        this.doughs.length > 0 &&
        this.ingredients.length > 0 &&
        this.sauces.length > 0 &&
        this.sizes.length > 0 &&
        this.misc.length > 0
      );
    }
  },
	actions: {
    async loadData() {
      await Promise.all([
        this.loadDoughs(),
        this.loadIngredients(),
        this.loadSauces(),
        this.loadSizes(),
        this.loadMisc(),
      ]);
    },

    async loadDoughs() {
      const res = await resources.dough.getDoughs();

      if (res.__state === 'success') {
        this.doughs = res.data.map(normalizeDough);
      }
    },

    async loadIngredients() {
      const res = await resources.ingredient.getIngredients();

      if (res.__state === 'success') {
        this.ingredients = res.data.map(normalizeIngredients);
      }
    },

    async loadSauces() {
      const res = await resources.sauce.getSauces();

      if (res.__state === 'success') {
        this.sauces = res.data.map(normalizeSauces);
      }
    },

    async loadSizes() {
      const res = await resources.size.getSizes();

      if (res.__state === 'success') {
        this.sizes = res.data.map(normalizeSize);
      }
    },
    
    async loadMisc() {
      const res = await resources.misc.getMisc();

      if (res.__state === 'success') {
        this.misc = res.data.map(normalizeDough);
      }
    },
  },
});
