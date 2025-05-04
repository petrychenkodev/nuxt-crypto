<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
  >
    <div
      class="bg-[#161b22] p-8 rounded-xl max-w-lg w-full text-white shadow-lg text-center"
    >
      <h2 class="text-2xl font-bold mb-4">👋 Welcome!</h2>
      <p class="text-base leading-relaxed mb-4">
        This website was developed by <strong>Oleksii Peterchenko</strong>, a
        frontend developer with over 7 years of experience. I specialize in
        <strong>Nuxt, Vue, JavaScript, TypeScript</strong> and have worked at
        multiple product companies with private codebases. I created this
        project to showcase my skills to future employers. Thank you for
        visiting!
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="https://www.linkedin.com/in/oleksii-petrychenko-38064515b/"
          target="_blank"
          class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
        >
          View my LinkedIn
        </a>
        <button
          class="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";

const handleKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    const event = new CustomEvent("modal-close");
    window.dispatchEvent(event);
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKey);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKey);
});
</script>
