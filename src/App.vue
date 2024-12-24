<template>
  <div id="app">
    <Login /> <!-- Ton nouveau composant -->
    <div class="bg-red-500 text-white p-4">
      Test Tailwind CSS
    </div>

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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
