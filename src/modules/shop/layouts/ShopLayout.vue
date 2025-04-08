<template>
  <!-- component -->
  <!-- Create By Joker Banny -->
  <!-- Header Navbar -->
  <TopMenu />

  <RouterView />

  <!-- Product List -->
  <HomeView />

  <!-- Footer -->
  <CustomFooter />
</template>

<script setup lang="ts">
import CustomFooter from '../components/CustomFooter.vue';
import TopMenu from '../components/TopMenu.vue';
import HomeView from '../views/HomeView.vue';
</script>
