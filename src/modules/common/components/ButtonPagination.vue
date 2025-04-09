<template>
  <div class="flex justify-center py-10 bg-gray-100">
    <button
      class="flex item-center space-x-1.5 rounded-lg mx-2 px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300"
    >
      <span>Anterior</span>
      <IconLeft />
    </button>

    <button
      class="flex item-center space-x-1.5 rounded-lg mx-2 px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300"
    >
      <span> Siguiente </span>
      <IconRight />
    </button>
  </div>
</template>

<script setup lang="ts">
import IconLeft from '@/assets/icons/IconLeft.vue';
import IconRight from '@/assets/icons/IconRight.vue';

interface Props {
  page: number;
  isFirstPage: boolean;
  hasMoreData: boolean;
}

defineProps<Props>();
</script>
