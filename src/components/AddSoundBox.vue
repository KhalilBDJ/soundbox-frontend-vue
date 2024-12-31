<template>
  <div class="w-40 h-40 bg-blue-200 bg-opacity-80 border border-blue-300 rounded-2xl shadow-md flex items-center justify-center font-anonymous">
    <button
        class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md font-bold"
        @click="openPopup"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  </div>

  <div
      v-if="isPopupVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      :class="{ 'animate-fadeOut': isPopupFadingOut }"
  >
    <div
        class="bg-white w-96 h-auto rounded-lg shadow-lg p-4 flex flex-col items-center font-anonymous"
    >
      <h2 class="text-xl font-semibold mb-4" v-if="!showAudioSpectrum">Ajouter un son</h2>

      <div v-if="!showAudioSpectrum">
        <input
            type="text"
            v-model="soundName"
            placeholder="Nom du son"
            class="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
        />

        <input
            type="text"
            v-model="youtubeUrl"
            placeholder="URL YouTube"
            class="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
        />

        <input
            type="text"
            v-model="instagramUrl"
            placeholder="URL Instagram"
            class="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
        />

        <input
            type="text"
            v-model="tiktokUrl"
            placeholder="URL TikTok"
            class="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
        />

        <input
            type="file"
            @change="onFileSelected"
            accept=".mp3,.wav"
            class="w-full mb-4 focus:ring focus:ring-blue-500"
        />

        <button
            class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            @click="addSound"
        >
          Ajouter
        </button>
      </div>

      <div v-if="showAudioSpectrum" class="w-full">
        <AudioSpectrum
            :audioBlob="audioBlob"
            @regionChange="onRegionChange"
        />

        <div class="mt-4 flex space-x-4">
          <button
              class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              @click="saveTrimmedSound"
          >
            Enregistrer le trim
          </button>
          <button
              class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              @click="closePopup"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AudioSpectrum from '../audio-spectrum/AudioSpectrum.vue';
import { useSoundService } from '../service/sound.service';

const isPopupVisible = ref(false);
const isPopupFadingOut = ref(false);
const youtubeUrl = ref('');
const instagramUrl = ref('');
const tiktokUrl = ref('');
const selectedFile = ref<File | null>(null);
const soundName = ref('');
const showAudioSpectrum = ref(false);
const audioBlob = ref<Blob | null>(null);
const audioName = ref('');
const regionStart = ref(0);
const regionEnd = ref(0);
const duration = ref(0);

const { getYouTubePreview, getInstagramPreview, getTikTokPreview, trimAndUploadSound, uploadSoundBytes } = useSoundService();

const openPopup = () => {
  isPopupVisible.value = true;
  isPopupFadingOut.value = false;
};

const closePopup = () => {
  isPopupFadingOut.value = true;
  setTimeout(() => {
    isPopupVisible.value = false;
    resetForm();
  }, 300);
};

const resetForm = () => {
  youtubeUrl.value = '';
  instagramUrl.value = '';
  tiktokUrl.value = '';
  selectedFile.value = null;
  soundName.value = '';
  showAudioSpectrum.value = false;
  audioBlob.value = null;
  audioName.value = '';
  duration.value = 0;
};

const addSound = async () => {
  const finalName = soundName.value.trim();
  if (youtubeUrl.value.trim()) {
    await addSoundFromYouTubePreview(finalName);
  } else if (instagramUrl.value.trim()) {
    await addSoundFromInstagramPreview(finalName);
  } else if (tiktokUrl.value.trim()) {
    await addSoundFromTikTokPreview(finalName);
  } else if (selectedFile.value) {
    prepareLocalFilePreview(finalName);
  } else {
    alert('Veuillez entrer une URL YouTube, Instagram, TikTok ou sélectionner un fichier audio.');
  }
};

const addSoundFromYouTubePreview = async (finalName: string) => {
  try {
    const response = await getYouTubePreview(youtubeUrl.value);
    const nameToUse = finalName || response.name;
    audioBlob.value = response.audioBlob;
    audioName.value = nameToUse;
    duration.value = response.duration;
    showAudioSpectrum.value = true;
  } catch (error) {
    console.error('Erreur lors de la pré-écoute du son YouTube :', error);
    alert("Erreur lors de la récupération de l'aperçu YouTube.");
  }
};

const addSoundFromInstagramPreview = async (finalName: string) => {
  try {
    const response = await getInstagramPreview(instagramUrl.value);
    const nameToUse = finalName || response.name;
    audioBlob.value = response.audioBlob;
    audioName.value = nameToUse;
    duration.value = response.duration;
    showAudioSpectrum.value = true;
  } catch (error) {
    console.error('Erreur lors de la pré-écoute du son Instagram :', error);
    alert("Erreur lors de la récupération de l'aperçu Instagram.");
  }
};

const addSoundFromTikTokPreview = async (finalName: string) => {
  try {
    const response = await getTikTokPreview(tiktokUrl.value);
    const nameToUse = finalName || response.name;
    audioBlob.value = response.audioBlob;
    audioName.value = nameToUse;
    duration.value = response.duration;
    showAudioSpectrum.value = true;
  } catch (error) {
    console.error('Erreur lors de la pré-écoute du son TikTok :', error);
    alert("Erreur lors de la récupération de l'aperçu TikTok.");
  }
};

const prepareLocalFilePreview = (finalName: string) => {
  if (!selectedFile.value) {
    alert('Aucun fichier sélectionné.');
    return;
  }
  const nameToUse = finalName || selectedFile.value.name.split('.')[0];
  audioBlob.value = selectedFile.value;
  audioName.value = nameToUse;
  showAudioSpectrum.value = true;
};

const onRegionChange = (region: { start: number; end: number }) => {
  regionStart.value = region.start;
  regionEnd.value = region.end;
};

const saveTrimmedSound = async () => {
  if (!audioBlob.value) {
    console.error('No audio loaded to trim.');
    return;
  }

  const reader = new FileReader();
  reader.onloadend = async () => {
    const audioBase64 = (reader.result as string).split(',')[1];

    try {
      const trimResponse = await trimAndUploadSound(audioBase64, regionStart.value, regionEnd.value);

      const soundData = {
        data: trimResponse.trimmed_audio_base64,
        name: audioName.value,
        duration: Math.round(regionEnd.value - regionStart.value),
      };

      await uploadSoundBytes(soundData);
      alert('Son ajouté avec succès !');
      closePopup();
    } catch (error) {
      alert('Erreur lors de la sauvegarde ou du découpage du son.');
      console.error(error);
    }
  };

  reader.readAsDataURL(audioBlob.value);
};

const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  selectedFile.value = target.files ? target.files[0] : null;
};
</script>

<style scoped>

</style>
