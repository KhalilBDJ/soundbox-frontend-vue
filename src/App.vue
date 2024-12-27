<template>
  <div id="app" >
    <router-view /> <!-- Ton nouveau composant -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Login from './components/Login.vue'; // Chemin vers le composant

export default defineComponent({
  name: 'App',
  components: {
    Login,
  },
});
</script>
