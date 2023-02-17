<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>
<script setup>
import { RouterView } from "vue-router";
import MainLayout from './Layouts/MainLayout'
</script>