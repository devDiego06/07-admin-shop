<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">Products</h1>

    <!-- component -->
    <div class="py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Imagen</th>
              <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Titulo</th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Precio</th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Tallas</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="(product, index) in products"
              :key="product.id"
              :class="{
                'bg-gray-100': index % 2 === 0,
              }"
            >
              <td class="w-1/3 text-left py-3 px-4">
                <img :src="product.images[0]" :alt="product.title" class="h-10 w-10 object-cover" />
              </td>
              <td class="w-1/3 text-left py-3 px-4">
                <RouterLink
                  :to="`/admin/products/${product.id}`"
                  class="hover:text-blue-500 hover:underline"
                >
                  {{ product.title }}
                </RouterLink>
              </td>
              <td class="text-left py-3 px-4">
                <span class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">{{
                  product.price
                }}</span>
              </td>
              <td class="text-left py-3 px-4">
                <span>{{ product.sizes.join(' ,') }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ButtonPagination :page="page" :has-more-data="!!products && products.length < 10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { UsePagination } from '@/modules/common/composables/usePagination';
import { getProductsActions } from '@/modules/products/actions/get-products.action';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watchEffect } from 'vue';

const queryClient = useQueryClient();
//Composable to handle pagination
const { page } = UsePagination();

//Fetch products, the page is passed as a parameter of queryFn
const { data: products = [] } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProductsActions(page.value),
});

// Prefetch the next page of products when the current page changes, and allow that page can be charged when the user click the next button
watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsActions(page.value + 1),
  });
});
</script>
