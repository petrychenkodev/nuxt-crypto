<template>
  <section class="crypto-regulations bg-[#0d1117] text-white p-6 min-h-screen">
    <h1 class="text-3xl font-bold text-center mb-6 mt-4">
      🌍 Crypto Regulations by Country
    </h1>
    <div
      class="flex flex-col md:flex-row items-center gap-4 mb-8 justify-center"
    >
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Search country..."
        class="px-4 py-2 rounded bg-[#161b22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
      />
      <select
        v-model="selectedStatus"
        class="px-4 py-2 rounded bg-[#161b22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
      >
        <option value="">🌎 All Statuses</option>
        <option value="Legal">✅ Legal</option>
        <option value="Partially Legal">⚖️ Partially Legal</option>
        <option value="Illegal">🚫 Illegal</option>
      </select>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div
        class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"
      ></div>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-[#161b22] rounded-lg">
        <thead>
          <tr>
            <th class="py-3 px-6 text-left">Flag</th>
            <th class="py-3 px-6 text-left">Country</th>
            <th class="py-3 px-6 text-left">Regulation Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="country in filteredCountries"
            :key="country.cca2"
            class="border-t border-gray-700"
          >
            <td class="py-3 px-6">
              <img
                :src="country.flags.png"
                :alt="country.name.common"
                class="w-8 h-5 object-cover"
              />
            </td>
            <td class="py-3 px-6">{{ country.name.common }}</td>
            <td class="py-3 px-6">
              <span
                :class="{
                  'text-green-400': regulationStatus[country.cca2] === 'Legal',
                  'text-yellow-400':
                    regulationStatus[country.cca2] === 'Partially Legal',
                  'text-red-400': regulationStatus[country.cca2] === 'Illegal',
                }"
              >
                {{ regulationStatus[country.cca2] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Country } from "@/types/crypto";

const countries = ref<Country[]>([]);
const isLoading = ref(true);
const searchQuery = ref("");
const selectedStatus = ref("");

const regulationStatus: Record<string, string> = {
  US: "Partially Legal",
  CN: "Illegal",
  CH: "Legal",
  UA: "Legal",
  JP: "Legal",
  SG: "Legal",
  DE: "Legal",
  IN: "Partially Legal",
  BR: "Legal",
};

const filteredCountries = computed(() => {
  return countries.value.filter((country) => {
    const status = regulationStatus[country.cca2];
    const matchesStatus = selectedStatus.value
      ? status === selectedStatus.value
      : true;
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    return status && matchesStatus && matchesSearch;
  });
});

onMounted(async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error(
        "Too many requests. Please wait a moment and try again. This is a free API and has a request limit."
      );
    }
    const data = await response.json();
    countries.value = data;
  } catch (error) {
    console.error("Error fetching countries:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.crypto-regulations {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th {
  background-color: #1f2937;
}
td,
th {
  padding: 12px 15px;
}
.loader {
  border-top-color: #3b82f6;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
