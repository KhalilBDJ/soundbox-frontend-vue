<template>
  <button
      @click="playSound"
      class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'PlayButton',
  props: {
    soundData: {
      type: String,
      required: true
    }
  },
  methods: {
    async playSound(): Promise<void> {
      if (!this.soundData || this.soundData.length === 0) {
        console.error('Aucune donnée de son disponible pour ce bouton.');
        return;
      }

      try {
        // Convert Base64 to ArrayBuffer
        const arrayBuffer = this.base64ToArrayBuffer(this.soundData);

        // Play the audio
        const context = new AudioContext();
        const buffer = await context.decodeAudioData(arrayBuffer);
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start();
      } catch (error) {
        console.error('Erreur lors de la lecture du son :', error);
      }
    },

    base64ToArrayBuffer(base64: string): ArrayBuffer {
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    }
  }
});
</script>

<style scoped>
.size-5 {
  width: 20px;
  height: 20px;
}
</style>
