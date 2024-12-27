<template>
  <div class="h-screen flex justify-center items-center">
    <div class="bg-white font-anonymous p-8 rounded-lg shadow-md w-[400px]">
      <!-- Titre -->
      <h2 class="text-black text-xl font-semibold text-center mb-6">Inscription</h2>

      <form @submit.prevent="onRegister">
        <!-- Champs du formulaire -->
        <div v-for="field in formFields" :key="field.name" class="mb-4">
          <label
              :for="field.name"
              class="text-black text-xl font-semibold block mb-2"
          >
            {{ field.label }}
          </label>
          <input
              :type="field.type"
              :id="field.name"
              v-model="registerData[field.name]"
              :name="field.name"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 "
              :placeholder="field.placeholder"
              required
          />
        </div>

        <!-- Bouton d'inscription -->
        <div class="mt-6">
          <button
              type="submit"
              class="w-full bg-[#73B3BC] text-white py-2 rounded-md hover:bg-[#048098] transition text-xl font-semibold  text-center"
          >
            S'inscrire
          </button>
        </div>
      </form>

      <!-- Message d'erreur -->
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>

      <!-- Retour à la connexion -->
      <div class="mt-4 text-center">
        <span class="text-gray-600">Déjà inscrit ?</span>
        <router-link to="/" class="text-[#048098] font-semibold hover:underline transition">
          Se connecter
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      formFields: [
        { name: 'email', label: 'Adresse email', type: 'email', placeholder: 'Entrez votre email' },
        { name: 'password', label: 'Mot de passe', type: 'password', placeholder: 'Entrez votre mot de passe' },
        { name: 'username', label: "Nom d'utilisateur", type: 'text', placeholder: "Entrez votre nom d'utilisateur" },
        { name: 'firstName', label: 'Prénom', type: 'text', placeholder: 'Entrez votre prénom' },
        { name: 'lastName', label: 'Nom', type: 'text', placeholder: 'Entrez votre nom' },
        { name: 'phoneNumber', label: 'Numéro de téléphone', type: 'tel', placeholder: 'Entrez votre numéro' }
      ],
      registerData: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    onRegister() {
      if (!this.registerData.email || !this.registerData.password) {
        this.errorMessage = "Tous les champs sont obligatoires.";
        return;
      }
      console.log("Inscription réussie :", this.registerData);
      this.errorMessage = "";
    },
  },
};
</script>
