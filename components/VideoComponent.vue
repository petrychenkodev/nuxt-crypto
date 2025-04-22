<template>
  <div
    class="w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg relative group"
  >
    <div
      v-if="!playing"
      class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center cursor-pointer z-10"
      @click="play"
    >
      <img
        :src="poster"
        alt="Video preview"
        class="absolute inset-0 w-full h-full object-cover z-0"
      />
      <button
        class="z-10 relative w-16 h-16 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 flex items-center justify-center shadow-lg"
      >
        <svg
          class="w-6 h-6 text-black ml-1"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>

    <iframe
      v-if="playing && youtubeId"
      class="w-full h-full absolute inset-0"
      :src="`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0`"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>

    <video
      v-if="playing && src"
      class="w-full h-full object-cover"
      autoplay
      controls
      playsinline
    >
      <source :src="src" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  youtubeId?: string;
  src?: string;
  poster?: string;
}>();

const playing = ref(false);
const play = () => {
  playing.value = true;
};
</script>
