<template>
  <div class="h-screen flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-[400px]">
      <!-- Titre -->
      <h2 class="text-black text-xl font-semibold font-anonymous text-center mb-6">Connexion</h2>

      <form @submit.prevent="onLogin">
        <!-- Champ Email -->
        <div class="mb-4">
          <label for="email" class="text-black text-xl font-semibold font-anonymous block mb-2">
            Adresse email
          </label>
          <input
              type="email"
              id="email"
              v-model="email"
              class="w-full px-4 py-2 border rounded-md focus:outline-none font-anonymous focus:ring-2"
              placeholder="Entrez votre email"
              required
          />
        </div>

        <!-- Champ Mot de passe -->
        <div class="mb-4">
          <label for="password" class="text-black text-xl font-semibold font-anonymous block mb-2">
            Mot de passe
          </label>
          <input
              type="password"
              id="password"
              v-model="password"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 font-anonymous"
              placeholder="Entrez votre mot de passe"
              required
          />
        </div>

        <!-- Bouton de Connexion -->
        <div class="mt-6">
          <button
              type="submit"
              class="w-full bg-[#73B3BC] text-white py-2 rounded-md hover:bg-[#048098] transition text-xl font-semibold font-anonymous text-center">
            Se connecter
          </button>
        </div>

        <!-- Nouveau bouton pour s'inscrire -->
        <div class="mt-4 text-center">
          <span class="text-gray-600">Pas encore de compte ?</span>
          <router-link
              to="/register"
              class="text-[#048098] font-semibold hover:underline transition">
            S'inscrire
          </router-link>
        </div>
      </form>

      <!-- Message d'erreur -->
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthService } from '@/service/auth.service';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const authService = useAuthService();

onMounted(() => {
  const token = authService.getToken();
  if (token) {
    router.push('/home');
  }
});

const onLogin = async () => {
  try {
    await authService.login({ email: email.value, password: password.value });
    try {
      await authService.sendOtp(email.value);
      alert('Un code OTP a été envoyé à votre adresse e-mail.');
      router.push({ name: 'verify-otp', query: { email: email.value } });
    } catch (error) {
      errorMessage.value = "Erreur lors de l'envoi de l'OTP.";
    }
  } catch (error) {
    errorMessage.value = 'Email ou mot de passe incorrect.';
  }
};
</script>

<style scoped>
</style>
