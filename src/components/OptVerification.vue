<template>
  <div class="h-screen flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-[400px]">
      <h2 class="text-black text-xl font-semibold text-center mb-6">Vérification OTP</h2>
      <form @submit.prevent="onVerifyOtp">
        <label for="otp" class="block mb-2 text-black">Code OTP</label>
        <input
            type="text"
            id="otp"
            v-model="otp"
            name="otp"
            class="w-full px-4 py-2 border rounded-md"
            required
        />
        <button type="submit" class="w-full bg-[#73B3BC] text-white py-2 mt-4 rounded-md">
          Vérifier
        </button>
      </form>
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthService } from '@/service/auth.service';

const otp = ref('');
const errorMessage = ref('');
const route = useRoute();
const router = useRouter();
const authService = useAuthService();

const email = ref((Array.isArray(route.query.email) ? route.query.email[0] : route.query.email) || '');

const onVerifyOtp = async () => {
  try {
    const response = await authService.verifyOtp(email.value, otp.value);
    localStorage.setItem('authToken', response.jwtToken);
    await router.push('/home');
  } catch (error) {
    errorMessage.value = 'Code OTP invalide.';
  }
};
</script>

<style scoped>
</style>
