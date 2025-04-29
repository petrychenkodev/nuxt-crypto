<template>
  <div class="fixed bottom-4 right-4 z-50">
    <button
      v-if="collapsed"
      @click="collapsed = false"
      class="bg-[#0d1117] text-white px-4 py-3 rounded-full shadow-lg border border-gray-700 hover:bg-gray-800 transition"
    >
      💬
    </button>
    <div
      v-else
      class="w-full max-w-md bg-[#0d1117] text-white rounded-xl shadow-lg overflow-hidden border border-gray-700"
    >
      <div
        class="p-4 font-bold border-b border-gray-600 flex justify-between items-center"
      >
        🤖 AI Crypto Bot
        <button
          @click="collapsed = true"
          class="text-gray-400 hover:text-white text-sm"
        >
          −
        </button>
      </div>

      <div class="p-4 space-y-2 h-64 overflow-y-auto" ref="chatBox">
        <div v-for="(msg, i) in messages" :key="i">
          <p class="text-sm">
            <span class="font-semibold">
              {{ msg.role === "user" ? "You" : "Bot" }}:
            </span>
            {{ msg.content }}
          </p>
        </div>
        <p v-if="isTyping" class="text-sm text-gray-400 italic">
          Bot is typing<span class="animate-pulse">...</span>
        </p>
      </div>

      <div class="p-4 border-t border-gray-600">
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <input
            v-model="input"
            class="flex-1 bg-gray-800 text-white p-2 rounded"
            placeholder="Ask something about crypto..."
          />
          <button class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            ↑
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { useFetch } from "nuxt/app";

const input = ref("");
const isTyping = ref(false);
const collapsed = ref(false);
const messages = ref<{ role: "user" | "assistant"; content: string }[]>([]);
const chatBox = ref<HTMLDivElement | null>(null);

onMounted(() => {
  messages.value.push({
    role: "assistant",
    content:
      "Hi there! 👋 I'm your AI Crypto Bot. Ask me anything about Bitcoin, Ethereum, DeFi, NFTs or staking!",
  });
});

const sendMessage = async () => {
  if (!input.value.trim()) return;

  messages.value.push({ role: "user", content: input.value });

  const userMsg = input.value;
  input.value = "";

  isTyping.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { data } = await useFetch<{ message: string }>("/api/chat", {
    method: "POST",
    body: { message: userMsg },
  });

  messages.value.push({
    role: "assistant",
    content: data.value?.message ?? "Sorry, I couldn’t answer that right now.",
  });

  isTyping.value = false;

  await nextTick();
  chatBox.value?.scrollTo({
    top: chatBox.value.scrollHeight,
    behavior: "smooth",
  });
};
</script>

<style scoped>
.animate-pulse::after {
  content: "…";
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}
</style>
