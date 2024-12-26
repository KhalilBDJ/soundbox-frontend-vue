<template>
  <div id="app" class="bg-custom-bg bg-cover bg-center ">
    <Login /> <!-- Ton nouveau composant -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Login from './testing/Login.vue'; // Chemin vers le composant

export default defineComponent({
  name: 'App',
  components: {
    Login,
  },
});
</script>

<style>

</style>
