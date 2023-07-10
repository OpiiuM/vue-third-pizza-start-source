<template>
	<div class="content__constructor">
		<app-drop @drop="$emit('drop', $event.id)">
			
			<div
				class="pizza"
				:class="`pizza--foundation--${props.dough}-${props.sauce}`"
			>
        <div class="pizza__wrapper">
          <transition-group name="scale">
            <div
              v-for="item in ingredients"
              :key="item.id"
              class="pizza__filling"
              :class="[
                `pizza__filling--${item.value}`,
                item.quantity === TWO_INGREDIENTS && 'pizza__filling--second',
                item.quantity === THREE_INGREDIENTS && 'pizza__filling--third',
              ]"
            />
          </transition-group>
        </div>
			</div>

		</app-drop>
	</div>
</template>

<script setup>
import AppDrop from '@/common/components/AppDrop.vue';

const props = defineProps({
	dough: {
		type: String,
		default: '',
	},
	sauce: {
		type: String,
		default: '',
	},
	ingredients: {
		type: Object,
		default: () => [],
	},
});

const TWO_INGREDIENTS = 2;
const THREE_INGREDIENTS = 3;
</script>
