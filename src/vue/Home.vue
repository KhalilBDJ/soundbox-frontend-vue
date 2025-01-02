<script setup lang="ts">

import MainContainer from "@/components/layouts/MainContainer.vue";
import {useAuthService} from "@/service/auth.service";
import {onMounted} from "vue";

const authService = useAuthService();
const email =authService.getUsername();

</script>

<template>
  <div class="h-screen bg-custom-bg bg-cover bg-center flex flex-col">
    <!-- Espace dynamique au-dessus -->
    <div class="flex-grow"></div>

    <!-- Texte à centrer -->
    <div class="text-white text-xl font-semibold font-anonymous text-center">
      Bonjour {{ email }}
    </div>

    <!-- Espace dynamique en dessous -->
    <div class="flex-grow"></div>

    <!-- Composant principal -->
    <main-container></main-container>
  </div>

</template>

<style scoped>

</style>