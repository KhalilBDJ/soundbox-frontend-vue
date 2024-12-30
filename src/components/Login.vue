<script setup>
</script>

<template>
  <div class="h-screen flex items-center justify-center font-anonymous">
    <div class="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 class="text-center text-lg font-bold mb-4">Connexion</h2>
      <form>
        <div class="mb-4">
          <label for="email" class="ext-black text-xl font-semibold font-anonymous block mb-2">Adresse email</label>
          <input
              id="email"
              type="email"
              placeholder="Entrez votre email"
              class="w-full px-3 py-2 border rounded-md italic focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="ext-black text-xl font-semibold font-anonymous block mb-2">Mot de passe</label>
          <input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              class="w-full px-3 py-2 border rounded-md italic focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
            type="submit"
            class="w-full bg-[#73B3BC] text-white py-2 rounded-md hover:bg-[#048098] transition text-xl font-semibold font-anonymous text-center"
        >
          Se connecter
        </button>
      </form>
      <div class="mt-4 text-center">
        <span class="text-gray-600">Pas encore de compte ?</span>
        <router-link to="/register" class="text-[#048098] font-semibold hover:underline transition">
          S'inscrire
        </router-link>
      </div>
    </div>
  </div>
</template>

