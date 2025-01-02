<template>
  <div id="waveform" class="w-full bg-gray-100 border border-gray-300 shadow-md rounded-md"></div>

  <div class="flex items-center mt-4 space-x-4">
    <!-- Bouton Play Region -->
    <button
        id="play-region"
        class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        @click="playRegion">
      Play Region
    </button>

    <!-- Bouton Stop -->
    <button
        id="stop-region"
        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        @click="stopPlayback">
      Stop
    </button>

    <!-- Barre de Zoom -->
    <input
        id="zoom-slider"
        type="range"
        min="0"
        max="1000"
        v-model="zoomLevel"
        @input="zoom"
        class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';

interface RegionChangeEvent {
  start: number;
  end: number;
}

const zoomLevel = ref(0);
const regionChange = ref<RegionChangeEvent | null>(null);

const props = defineProps<{ audioBlob: Blob | null }>();

let waveSurfer: WaveSurfer | null = null;

onMounted(() => {
  waveSurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    plugins: [
      RegionsPlugin.create({})
    ]
  });

  if (props.audioBlob) {
    waveSurfer.loadBlob(props.audioBlob);
  }

  waveSurfer.on('ready', () => {
    addInitialRegion();
  });

  waveSurfer.on('region-update-end', (region: any) => {
    console.log('Region updated:', region.start, region.end);
    regionChange.value = { start: region.start, end: region.end };
  });
});

/** Ajoute une région initiale */
const addInitialRegion = () => {
  if (!waveSurfer) return;

  const audioDuration = waveSurfer.getDuration();
  const start = audioDuration * 0.2;
  const end = audioDuration * 0.8;

  waveSurfer.addRegion({
    start,
    end,
    color: 'rgba(200, 0, 200, 0.5)',
    drag: true,
    resize: true
  });
};

/** Lecture de la région */
const playRegion = () => {
  if (!waveSurfer) return;

  const regions = waveSurfer.regions.list;
  const regionKeys = Object.keys(regions);

  if (regionKeys.length > 0) {
    const region = regions[regionKeys[0]];
    console.log(`Lecture de la région : Start = ${region.start}, End = ${region.end}`);
    region.play();
  } else {
    console.warn('No regions available to play.');
  }
};

/** Arrêter la lecture */
const stopPlayback = () => {
  if (waveSurfer) {
    waveSurfer.stop();
    console.log('Lecture stoppée.');
  }
};

/** Contrôle du zoom */
const zoom = () => {
  if (waveSurfer) {
    console.log(`Zoom level: ${zoomLevel.value}`);
    waveSurfer.zoom(zoomLevel.value);
  }
};
</script>

<style scoped>
#waveform {
  height: 100px;
}
</style>
