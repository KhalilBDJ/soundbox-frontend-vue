<script setup>
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-custom-bg bg-cover bg-center font-anonymous">
    <div class="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 class="text-center text-lg font-bold mb-4">Connexion</h2>
      <form>
        <div class="mb-4">
          <label for="email" class="block text-sm font-italic mb-1">Adresse email</label>
          <input
              id="email"
              type="email"
              placeholder="Entrez votre email"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-semibold mb-1">Mot de passe</label>
          <input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
            type="submit"
            class="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition"
        >
          Se connecter
        </button>
      </form>
      <p class="text-center text-sm text-gray-600 mt-4">
        Pas encore de compte ? <a href="#" class="text-teal-500 hover:underline">S'inscrire</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Supprime l'importation Google Fonts, car Tailwind gère la police Anonymous Pro */
</style>
