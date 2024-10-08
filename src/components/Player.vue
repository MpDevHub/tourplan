<!-- <script setup>
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

const changePage = (direction) => {
  currentPage.value += direction;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) changePage(1);
};

const prevPage = () => {
  if (currentPage.value > 1) changePage(-1);
};

const loadAndPlayAudio = (song, index) => {
  if (currentAudio.value && playingSongIndex.value === index) {
    pauseAudio();
  } else {
    playAudio(song, index);
  }
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
            <button class="w-24 h-24 rounded-full bg-blue-500 focus:outline-none" @click="loadAndPlayAudio(song, index)">
              <font-awesome-icon :icon="isPlaying && playingSongIndex === index ? 'pause' : 'play'" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4 sticky-footer">
    <button class="btn btn-outline" @click="prevPage" :disabled="currentPage === 1">Prev</button>

    <button class="btn btn-outline" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template> -->

<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Virtual Plan</a>
      <select
        v-model="selectedLanguage"
        class="select select-bordered w-full max-w-xs"
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
</style>
