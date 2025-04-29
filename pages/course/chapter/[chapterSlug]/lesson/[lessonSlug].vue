<template>
  <div class="p-6 text-white">
    <h1 class="text-4xl font-bold mb-4">{{ t.title }}</h1>

    <div class="max-w-4xl w-full">
      <img
        v-if="t.image"
        :src="t.image"
        :alt="t.title"
        class="rounded-xl mb-6 w-full max-h-[400px] object-cover"
      />
    </div>

    <p class="text-lg mb-4 leading-relaxed text-gray-300">
      {{ t.description }}
    </p>

    <h2 class="text-2xl font-semibold mb-2 mt-6">{{ t.benefitsTitle }}</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li v-for="benefit in t.benefits" :key="benefit">{{ benefit }}</li>
    </ul>

    <h2 class="text-2xl font-semibold mb-2 mt-6">{{ t.resourcesTitle }}</h2>
    <ul class="list-disc list-inside text-blue-400 space-y-1 underline">
      <li v-for="link in t.resources" :key="link.url">
        <a :href="link.url" target="_blank" rel="noopener noreferrer">
          {{ link.label }}
        </a>
      </li>
    </ul>
    <div class="max-w-4xl w-full mt-4">
      <VideoComponent
        v-if="t.video?.youtubeId || t.video?.src"
        :youtube-id="t.video?.youtubeId"
        :src="t.video?.src"
        :poster="t.video?.poster"
        class="mb-8"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useLanguage } from "@/composables/useLanguage";
import { lessonContent } from "@/data/lessonContent";
import { LessonContent } from "@/types/crypto";


const { language } = useLanguage();
const route = useRoute();

const chapterSlug = computed(() => route.params.chapterSlug as string);
const lessonSlug = computed(() => route.params.lessonSlug as string);

const t = computed<LessonContent>(() => {
  return (
    lessonContent[chapterSlug.value]?.[lessonSlug.value]?.[language.value] || {
      title: "Lesson Not Found",
      description: "Sorry, we couldn’t find this lesson.",
      image: "",
      benefitsTitle: "",
      benefits: [],
      resourcesTitle: "",
      resources: [],
      video: {},
    }
  );
});
</script>
