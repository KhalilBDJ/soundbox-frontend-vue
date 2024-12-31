<template>
  <div class="w-40 h-40 bg-blue-200 bg-opacity-80 border border-blue-300 rounded-2xl shadow-md relative">
    <!-- Nom du son -->
    <span class="absolute top-4 left-1/2 transform -translate-x-1/2 font-anonymous text-white">
      {{ sound.name }}
    </span>

    <!-- Boutons horizontaux -->
    <HorizontalButtonsLayout
        :sound="sound"
        @modifyClicked="openEditPopup"
    />
  </div>

  <!-- Popup -->
  <div
      v-if="!isFullyHidden"
      :class="{ 'animate-fadeIn': !isFadingOut, 'animate-fadeOut': isFadingOut }"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-anonymous"
  >
    <div class="bg-white w-96 h-auto rounded-lg shadow-lg p-4 flex flex-col items-center">
      <h2 class="text-xl font-semibold mb-4">Modifier le nom du son</h2>

      <!-- Champ de texte -->
      <input
          type="text"
          v-model="editedName"
          placeholder="Entrez le nouveau nom"
          class="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Boutons -->
      <div class="flex space-x-4">
        <button
            class="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
            @click="saveName"
        >
          Valider
        </button>
        <button
            class="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
            @click="closeEditPopup"
        >
          Fermer
        </button>
        <button
            class="px-4 py-2 bg-red-700 text-white rounded-md shadow-md hover:bg-red-800"
            @click="deleteSound"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HorizontalButtonsLayout from '../layouts/HorizontalButtonsLayout.vue';
import { useSoundService } from '@/service/sound.service';
import type { Sound } from '@/service/sound.service';

interface Props {
  sound: Sound;
}

const props = defineProps<Props>();
const emit = defineEmits(['soundDeleted']);

const { updateSoundName, deleteSound } = useSoundService();

const isPopupVisible = ref(false);
const isFadingOut = ref(false);
const isFullyHidden = ref(true);
const editedName = ref('');

const openEditPopup = () => {
  isPopupVisible.value = true;
  isFullyHidden.value = false;
  isFadingOut.value = false;
  editedName.value = props.sound.name;
};

const closeEditPopup = () => {
  isFadingOut.value = true;
  setTimeout(() => {
    isPopupVisible.value = false;
    isFullyHidden.value = true;
  }, 300);
};

const saveName = async () => {
  if (editedName.value.trim() && editedName.value !== props.sound.name) {
    try {
      await updateSoundName(props.sound.id, editedName.value);
      props.sound.name = editedName.value;
      closeEditPopup();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du nom :', error);
    }
  } else {
    closeEditPopup();
  }
};

const deleteSoundAction = async () => {
  isFadingOut.value = true;
  setTimeout(async () => {
    try {
      await deleteSound(props.sound.id);
      isFullyHidden.value = true;
      alert(`Votre son \"${props.sound.name}\" a été supprimé.`);
      emit('soundDeleted');
    } catch (error) {
      console.error('Erreur lors de la suppression du son :', error);
    }
  }, 300);
};
</script>

<style scoped>
.size-6 {
  width: 24px;
  height: 24px;
}
.animate-fadeIn {
  animation: fadeIn 300ms ease-in-out;
}
.animate-fadeOut {
  animation: fadeOut 300ms ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
