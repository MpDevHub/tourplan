<script setup>
import { ref, computed } from 'vue';
import { songs } from '../songs'; // Import your data source

// Reactive references
const selectedLanguage = ref('ina');
const currentAudio = ref(null);
const isPlaying = ref(false);
const playingSongIndex = ref(null);

// Pagination state
const currentPage = ref(1);
const cardsPerPage = 4; // Fixed value

// Computed properties
const paginatedSongs = computed(() => {
  const start = (currentPage.value - 1) * cardsPerPage;
  return songs.slice(start, start + cardsPerPage);
});

const totalPages = computed(() => Math.ceil(songs.length / cardsPerPage));

const currentSongDuration = computed(() => {
  return currentAudio.value ? currentAudio.value.duration : 0;
});

// Helper functions
const getAudioSrc = (song) => song.audio[selectedLanguage.value];

const playAudio = (song, index) => {
  if (currentAudio.value) {
    currentAudio.value.pause();
  }

  paginatedSongs.value.forEach((s, i) => {
    s.playing = (i === index);
  });

  if (playingSongIndex.value === index) {
    pauseAudio();
    return;
  }

  playingSongIndex.value = index;
  currentAudio.value = new Audio(getAudioSrc(song));
  currentAudio.value.play();
  isPlaying.value = true;

  currentAudio.value.addEventListener('ended', pauseAudio);
};

const pauseAudio = () => {
  if (currentAudio.value) {
    currentAudio.value.pause();
    isPlaying.value = false;
    paginatedSongs.value.forEach(song => song.playing = false);
    currentAudio.value = null;
    playingSongIndex.value = null;
  }
};

const togglePlay = (song, index) => {
  if (isPlaying.value && playingSongIndex.value === index) {
    pauseAudio();
  } else {
    playAudio(song, index);
  }
};

const changePage = (direction) => {
  currentPage.value += direction;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) changePage(1);
};

const prevPage = () => {
  if (currentPage.value > 1) changePage(-1);
};
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Virtual Plan</a>
      <select v-model="selectedLanguage" class="select select-bordered w-full max-w-xs">
        <option value="ina">Indonesia</option>
        <option value="eng">English</option>
        <option value="chn">Mandarin</option>
      </select>
    </div>
  </div>

  <div class="grid grid-cols-2">
    <div v-for="(song, index) in paginatedSongs" :key="song.title" class="items-center text-center">
      <div class="hero bg-base-200 mb-4">
        <div class="hero-content flex-col lg:flex-row">
          <div>
            <div class="flex justify-center">
              <p class="text-xl">{{ index + 1 }}</p>
              <h1 class="text-5xl font-bold">{{ song.title }}</h1>
            </div>
            <p class="py-6">{{ song.artist }}</p>
            <button class="w-24 h-24 rounded-full bg-blue-500 focus:outline-none" @click="togglePlay(song, index)">
              <font-awesome-icon :icon="song.playing ? 'pause' : 'play'" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4 sticky-footer">
    <button class="btn btn-outline" @click="prevPage" :disabled="currentPage === 1">Prev</button>

    <button class="btn btn-sm mr-2" @click="playAudio(songs[playingSongIndex])" :disabled="playingSongIndex === null">Suara diputar</button>
    <button class="btn btn-sm btn-outline" @click="pauseAudio" :disabled="!isPlaying">Stop</button>
    <button class="btn btn-outline" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<style scoped>
.hero {
  margin-bottom: 5px; /* Add space between cards */
}

.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff; /* optional */
  padding: 10px; /* optional */
  border-top: 1px solid #ddd; /* optional */
}


</style>