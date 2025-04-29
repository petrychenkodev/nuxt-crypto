<template>
  <section class="bg-[#0d1117] min-h-screen text-white flex">
    <aside
      class="w-full max-w-[300px] border-r border-gray-700 p-6 overflow-y-auto"
    >
      <h2 class="text-2xl font-bold mb-6 mt-4 text-center">
        {{ language === "en" ? "Crypto Courses" : "Курси з криптовалюти" }}
      </h2>
      <div class="space-y-4">
        <NuxtLink
          v-for="course in courses"
          :key="course.id"
          class="block bg-[#161b22] rounded-xl shadow p-4 cursor-pointer hover:bg-[#1d222c] transition"
          :to="`/course/chapter/${course.chapterSlug}/lesson/${course.lessonSlug}`"
        >
          <img
            :src="course.image"
            :alt="getLocalizedValue(course, 'title', language as LanguageCode)"
            class="w-full h-24 object-cover rounded mb-2"
          />
          <h3 class="text-base font-semibold">
            {{ getLocalizedValue(course, "title", language as LanguageCode) }}
          </h3>
        </NuxtLink>
      </div>
    </aside>

    <main class="flex-1 p-8 overflow-y-auto">
      <NuxtPage />
    </main>
  </section>
</template>

<script setup lang="ts">
import { useLanguage } from "@/composables/useLanguage";
import { courses, type Course, type LanguageCode } from "@/data/courses";

const { language } = useLanguage();

function getLocalizedValue(
  course: Course,
  field: "title" | "description",
  lang: LanguageCode
): string {
  const key = `${field}_${lang}` as keyof Course;
  return course[key] ?? "";
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
