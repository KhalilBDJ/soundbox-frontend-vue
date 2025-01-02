<template>
  <div
      class="bg-[#D9D9D9] bg-opacity-0 rounded-[90px] border-[10px] border-white w-full max-w-[calc(100%-200px)] h-[80vh] mx-[100px] p-20 overflow-auto mb-20"
  >
    <div class="flex flex-wrap gap-x-20 gap-y-20 justify-start items-start w-full">
      <box
          v-for="sound in sounds"
          :key="sound.id"
          :sound="sound"
          @soundDeleted="onSoundDeleted"
      />
      <AddSoundBox @soundAdded="onSoundAdded" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Box from "@/components/Box.vue";
import AddSoundBox from "@/components/AddSoundBox.vue";
import { useSoundService, type Sound } from '@/service/sound.service';

const sounds = ref<Sound[]>([]);
const { getUserSounds } = useSoundService();

const refreshSounds = async () => {
  try {
    const data = await getUserSounds();
    console.log('Données des sons après conversion:', data);
    sounds.value = data;
  } catch (error) {
    console.error('Erreur lors de la récupération des sons :', error);
  }
};

const onSoundAdded = () => {
  console.log('Un son a été ajouté, rafraîchissement des données...');
  refreshSounds();
};

const onSoundDeleted = () => {
  console.log('Son supprimé, actualisation des données...');
  refreshSounds();
};

onMounted(() => {
  refreshSounds();
});
</script>

<style scoped>
</style>
