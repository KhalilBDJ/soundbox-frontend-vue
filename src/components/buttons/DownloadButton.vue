<template>
  <button
      @click="downloadSound"
      class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  </button>
</template>

<script setup lang="ts">

interface Sound {
  id: number;
  name: string;
  data: string;
}

const props = defineProps<{ sound: Sound }>();

const downloadSound = (): void => {
  if (!props.sound || !props.sound.data) {
    console.error('Aucune donnée à télécharger pour ce son.');
    return;
  }

  const byteString = atob(props.sound.data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: 'audio/mpeg' });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${props.sound.name}.mp3`;
  a.click();

  URL.revokeObjectURL(url);
};
</script>

<style scoped>
.size-6 {
  width: 24px;
  height: 24px;
}
</style>
