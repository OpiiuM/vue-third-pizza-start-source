<template>
  <form class="address-form address-form--opened sheet" @submit.prevent="save">
    <div class="address-form__header">
      <b>{{ title }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <app-input
          v-model="name"
          label="Название адреса*"
          type="text"
          name="addr-name"
          placeholder="Введите название адреса"
          required
        />
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <app-input
          v-model="street"
          label="Улица*"
          type="text"
          name="addr-street"
          placeholder="Введите название улицы"
          required
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <app-input
          v-model="building"
          label="Дом*"
          type="text"
          name="addr-house"
          placeholder="Введите номер дома"
          required
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <app-input
          v-model="flat"
          label="Квартира"
          type="text"
          name="addr-apartment"
          placeholder="Введите № квартиры"
        />
      </div>
      <div class="address-form__input">
        <app-input
          v-model="comment"
          label="Комментарий"
          type="text"
          name="addr-comment"
          placeholder="Введите комментарий"
        />
      </div>
    </div>

    <div class="address-form__buttons">
      <button type="button" class="button button--transparent" @click="emit('delete')">
        Удалить
      </button>
      <button type="submit" class="button">Сохранить</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

import AppInput from '@/common/components/AppInput.vue';

const props = defineProps({
  address: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['delete', 'save']);

const name = ref(props.address?.name ?? '');
const street = ref(props.address?.street ?? '');
const building = ref(props.address?.building ?? '');
const flat = ref(props.address?.flat ?? '');
const comment = ref(props.address?.comment ?? '');

const save = () => {
  emit('save', {
    name: name.value,
    street: street.value,
    building: building.value,
    flat: flat.value,
    comment: comment.value,
  });
};
</script>
