<template>
  <div class="absolute bottom-6 flex justify-evenly items-center w-full">
    <PlayButton :soundData="sound.data" />
    <ModifyButton @modify-clicked="onModifyClick" />
    <DownloadButton :sound="sound" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PlayButton from '../../buttons/play-button/PlayButton.vue';
import ModifyButton from '../buttons/ModifyButton.vue';
import DownloadButton from '../../buttons/download-button/DownloadButton.vue';
import { Sound } from '@/service/sound.service'

export default defineComponent({
  name: 'HorizontalButtonsLayout',
  components: {
    PlayButton,
    ModifyButton,
    DownloadButton
  },
  props: {
    sound: {
      type: Object as PropType<Sound>,
      required: true
    }
  },
  emits: ['modify-clicked'],
  methods: {
    onModifyClick(): void {
      this.$emit('modify-clicked');
    }
  }
});
</script>

<style scoped>
</style>
