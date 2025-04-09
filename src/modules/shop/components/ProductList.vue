<template>
  <!-- Tab Menu -->

  <div
    class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/modules/products/actions/interfaces/product.interface';
import ProductCard from './ProductCard.vue';

interface Props {
  products: Product[];
}

defineProps<Props>();
</script>
