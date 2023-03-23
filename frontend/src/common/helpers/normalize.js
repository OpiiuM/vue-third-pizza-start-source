import {
    doughSizes,
    sauceValues,
    sizesValues,
    ingredientsValues,
} from '@/common/data';

export const normalizeDough = (dough) => {
    return {
        ...dough,
        value: doughSizes[dough.id],
    };
};

export const normalizeSize = (size) => {
    return {
        ...size,
        value: sizesValues[size.id],
    };
};

export const normalizeIngredients = (ingredient) => {
    return {
        ...ingredient,
        value: ingredientsValues[ingredient.id],
    };
};

export const normalizeSauces = (sauce) => {
    return {
        ...sauce,
        value: sauceValues[sauce.id],
    };
};
