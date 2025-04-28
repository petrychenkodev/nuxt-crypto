<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
  >
    <div
      class="bg-[#161b22] p-8 rounded-2xl max-w-md w-full text-white text-center shadow-2xl animate-fadeIn"
    >
      <h2 class="text-3xl font-bold mb-6">🖊️ Leave your signature</h2>
      <canvas
        ref="canvasRef"
        width="600"
        height="300"
        class="border border-gray-600 bg-[#0d1117] rounded-lg cursor-crosshair w-full max-w-[600px] touch-none mb-4"
        @mousedown.prevent="startDrawing"
        @mousemove.prevent="draw"
        @mouseup.prevent="stopDrawing"
        @mouseleave.prevent="stopDrawing"
        @touchstart.prevent="startDrawing"
        @touchmove.prevent="draw"
        @touchend.prevent="stopDrawing"
      />

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button
          class="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-xl transition font-semibold"
          :disabled="!hasSigned"
          @click="confirmSignature"
        >
          Confirm
        </button>
        <button
          class="bg-yellow-600 hover:bg-yellow-500 px-6 py-2 rounded-xl transition font-semibold"
          @click="clearCanvas"
        >
          Clear
        </button>
        <button
          class="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-xl transition font-semibold"
          @click="cancel"
        >
          Cancel
        </button>
      </div>

      <p v-if="errorMessage" class="text-red-400 mt-4 text-sm">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["close"]);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const isDrawing = ref(false);
const hasSigned = ref(false);
const errorMessage = ref("");

const router = useRouter();

const getCoordinates = (event: MouseEvent | TouchEvent) => {
  const canvas = canvasRef.value;
  if (!canvas) return { x: 0, y: 0 };

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  if (event instanceof MouseEvent) {
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  } else if (event instanceof TouchEvent) {
    const touch = event.touches[0];
    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY,
    };
  }
  return { x: 0, y: 0 };
};

const startDrawing = (event: MouseEvent | TouchEvent) => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const { x, y } = getCoordinates(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawing.value = true;
  }
};

const draw = (event: MouseEvent | TouchEvent) => {
  if (!isDrawing.value) return;
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const { x, y } = getCoordinates(event);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
    hasSigned.value = true;
  }
};

const stopDrawing = () => {
  isDrawing.value = false;
};

const clearCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasSigned.value = false;
    errorMessage.value = "";
  }
};

const confirmSignature = () => {
  if (!hasSigned.value) {
    errorMessage.value = "✋ Please provide your signature first.";
    return;
  }
  emit("close");
  router.push("/course");
};

const cancel = () => {
  emit("close");
};
</script>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

canvas {
  touch-action: none;
}
</style>
