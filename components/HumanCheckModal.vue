<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
  >
    <div
      class="bg-[#161b22] p-8 rounded-xl max-w-md w-full text-white shadow-lg text-center"
    >
      <h2 class="text-2xl font-bold mb-4">🤔 Are you human?</h2>
      <p class="mb-6 text-lg">{{ question }}</p>

      <input
        v-model="userAnswer"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        placeholder="Enter your answer"
        class="w-full p-3 rounded bg-[#0d1117] border border-gray-700 mb-4 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        @keyup.enter="checkAnswer"
      />

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button
          class="px-4 py-2 bg-green-600 rounded hover:bg-green-500 transition"
          @click="checkAnswer"
        >
          Submit
        </button>
        <button
          class="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
          @click="generateQuestion"
        >
          New Question
        </button>
      </div>

      <p v-if="errorMessage" class="text-red-400 mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const emit = defineEmits(["success"]);

const number1 = ref(0);
const number2 = ref(0);
const operation = ref("+");
const correctAnswer = ref(0);
const userAnswer = ref<string>("");
const errorMessage = ref("");

const generateQuestion = () => {
  const operations = ["+", "-", "*", "/"];
  operation.value = operations[Math.floor(Math.random() * operations.length)];

  if (operation.value === "/") {
    number2.value = Math.floor(Math.random() * 9) + 1;
    correctAnswer.value = Math.floor(Math.random() * 10) + 1;
    number1.value = correctAnswer.value * number2.value;
  } else {
    number1.value = Math.floor(Math.random() * 10) + 1;
    number2.value = Math.floor(Math.random() * 10) + 1;

    if (operation.value === "+") {
      correctAnswer.value = number1.value + number2.value;
    } else if (operation.value === "-") {
      correctAnswer.value = number1.value - number2.value;
    } else if (operation.value === "*") {
      correctAnswer.value = number1.value * number2.value;
    }
  }

  userAnswer.value = "";
  errorMessage.value = "";
};

const checkAnswer = () => {
  const parsedAnswer = parseInt(userAnswer.value, 10);

  if (parsedAnswer === correctAnswer.value) {
    emit("success");
  } else {
    errorMessage.value = "❌ Incorrect. Try again!";
    setTimeout(() => {
      generateQuestion();
    }, 800);
  }
};

const question = computed(
  () => `${number1.value} ${operation.value} ${number2.value} = ?`
);

generateQuestion();
</script>

<style scoped>
input::placeholder {
  color: #9ca3af;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
