<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Virtual Plan</a>
      <select
        v-model="selectedLanguage"
        class="select select-bordered w-full max-w-xs"
        @change="handleLanguageChange"
      >
        <option value="ina">Indonesia</option>
        <option value="eng">English</option>
        <option value="chn">Mandarin</option>
      </select>
    </div>
  </div>
  <div id="songList" class="items-center text-center grid grid-cols-2">
    <div
      v-for="(song, index) in paginatedSongs"
      :key="index"
      @click="playSelectedSong($event, song)"
      :class="{ 'bg-blue-500': song.title === currentSongTitle }"
    >
      <div class="hero bg-base-200 mb-4">
        <div class="hero-content flex-col lg:flex-row">
          <div>
            <div class="flex justify-center">
              <p class="text-xl">{{ index + 1 }}</p>
              <h1 class="text-5xl font-bold">{{ song.title }}</h1>
            </div>
            <p class="py-6">{{ song.artist }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-between items-center mt-4 sticky-footer">
    <button
      class="btn btn-sm text-xs"
      @click="prevPage"
      :disabled="currentPage === 1"
    >
      Prev Page
    </button>
    <audio ref="audioPlayer" @ended="pauseAudio"></audio>
    <button
      class="w-12 h-12 rounded-full bg-blue-500 focus:outline-none"
      @click="toggleAudio"
    >
      <font-awesome-icon :icon="isPlaying ? 'pause' : 'play'" />
    </button>
    <div class="pl-2" id="currentSong">Now Playing: {{ currentSongTitle }}</div>
    <!-- <span>{{ currentPage }} / {{ totalPages }}</span> -->
    <button
      class="btn btn-sm"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div>

  <div v-if="isLoading" class="loading-overlay">
    <div class="loading loading-dots loading-lg">
      <!-- <img
      class="img"
      src="../assets/loading/loading.gif"
      alt="loading..."
      width="250"
    /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { songs } from "../songs"; // Import your song data

// Reactive references
const selectedLanguage = ref("ina");
const audioPlayer = ref(null);
const currentSongTitle = ref("");
const isPlaying = ref(false); // Add a new ref to track the playback state
const currentPage = ref(1); // Add a new ref to track the current page
const pageSize = ref(6); // Set the page size to 4
const isLoading = ref(false); // New loading state

const paginatedSongs = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  return songs.filter(
    (song, index) => index >= startIndex && index < startIndex + pageSize.value
  );
});

const totalPages = computed(() => Math.ceil(songs.length / pageSize.value));

const playSelectedSong = (event, song) => {
  // use the song object here
  isPlaying.value = true;
  audioPlayer.value.src = song.audio[selectedLanguage.value];
  currentSongTitle.value = song.title;
  audioPlayer.value.load();
  audioPlayer.value.play();
};

const toggleAudio = () => {
  if (isPlaying.value) {
    pauseAudio();
  } else {
    playAudio();
  }
};

const playAudio = () => {
  if (audioPlayer.value.readyState) {
    audioPlayer.value.play();
    isPlaying.value = true;
  }
};

const pauseAudio = () => {
  audioPlayer.value.pause();
  isPlaying.value = false;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const handleLanguageChange = () => {
  pauseAudio();
  isLoading.value = true; // Set loading state to true
  setTimeout(() => {
    isLoading.value = false; // Simulate loading time
  }, 2000); // Adjust the duration as needed
};
</script>

<style scoped>
.hero {
  margin-bottom: 5px; /* Add space between cards */
}

.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f0f0f0; /* optional */
  padding: 10px; /* optional */
  border-top: 1px solid #ddd; /* optional */
  z-index: 1; /* add this line */
}

#songList {
  cursor: pointer;
}

.hero {
  transition: background-color 0.5s; /* color transition */
  margin-bottom: 5px; /* Add space between cards */
}

/* Loading overlay styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's above all other content */
  animation: fadeIn-Out 2s ease-in-out;
  opacity: 0;
}

/* .loading-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
} */

@keyframes fadeIn-Out {
  from { opacity: 0; }
  50% { opacity: 1; }
  to { opacity: 0; }
}
</style>
