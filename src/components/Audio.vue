<script setup>
import { ref, computed } from "vue";
import { songs } from "../songs"; // Import your data source
import avatar from "./Avatar.vue";

// const selectedLanguage = ref("ina");
// let currentAudio = null;
// let isPlaying = ref(false);

const selectedLanguage = ref("ina");
let currentAudio = null;
let playingSongIndex = ref(-1); // -1 indicates no song playing
let isPlaying = ref(false);

const changeLanguage = () => {
  // Update audio source based on selected language
};

// const audioSrc = computed(() => {
//   return songs.find(song => song.title === song.title).audio[selectedLanguage.value];
// });

const audioSrc = (song) => {
  return song.audio[selectedLanguage.value];
};

// const playAudio = (audio) => {
//   if (currentAudio) {
//     currentAudio.pause();
//   }
//   currentAudio = audio;
//   audio.play();
// };

// const playAudio = (song) => {
//   const audioSrc = song.audio[selectedLanguage.value];
//   fetch(audioSrc)
//     .then((response) => response.blob())
//     .then((blob) => {
//       const audio = new Audio(URL.createObjectURL(blob));
//       if (currentAudio) {
//         currentAudio.pause();
//       }
//       currentAudio = audio;
//       audio.play();
//     });
// };

// const playAudio = (song) => {
//   const audioSrc = song.audio[selectedLanguage.value];
//   fetch(audioSrc)
//     .then((response) => response.blob())
//     .then((blob) => {
//       const audio = new Audio(URL.createObjectURL(blob));
//       if (currentAudio) {
//         currentAudio.pause();
//       }
//       currentAudio = audio;
//       audio.play();
//       isPlaying.value = true;
//     });
// };

// const playAudio = (song) => {
//   if (song.playing) {
//     song.playing = false;
//     currentAudio.pause();
//   } else {
//     song.playing = true;
//     const audioSrc = song.audio[selectedLanguage.value];
//     fetch(audioSrc)
//       .then((response) => response.blob())
//       .then((blob) => {
//         const audio = new Audio(URL.createObjectURL(blob));
//         if (currentAudio) {
//           currentAudio.pause();
//         }
//         currentAudio = audio;
//         audio.play();
//       });
//   }
// };

////////////////////////


////////////////////////

const playAudio = (song) => {
  if (song.playing) {
    song.playing = false;
    currentAudio.pause();
    isPlaying.value = false;
  } else {
    paginatedSongs.value.forEach((s) => {
      s.playing = false;
    });
    song.playing = true;
    isPlaying.value = true;
    const audioSrc = song.audio[selectedLanguage.value];
    if (currentAudio) {
      currentAudio.pause();
    }
    currentAudio = new Audio(audioSrc);
    currentAudio.play();
  }
};

// const playAudio = (song) => {
//   if (isPlaying.value) {
//     pauseAudio();
//   }
//   if (song.playing) return; // Return if the song is already playing
//   paginatedSongs.value.forEach((s) => {
//     s.playing = false;
//   });
//   song.playing = true;
//   isPlaying.value = true;
//   const audioSrc = song.audio[selectedLanguage.value];
//   fetch(audioSrc)
//     .then((response) => response.blob())
//     .then((blob) => {
//       currentAudio = new Audio(URL.createObjectURL(blob));
//       currentAudio.play();
//     })
//     .catch((error) => {
//       console.error("Audio playback interrupted:", error);
//     });
// };

// const playAudio = (song) => {
//   if (song.playing) {
//     song.playing = false;
//     currentAudio.pause();
//     isPlaying.value = false;
//   } else {
//     paginatedSongs.value.forEach((s) => {
//       s.playing = false;
//     });
//     song.playing = true;
//     isPlaying.value = true;
//     const audioSrc = song.audio[selectedLanguage.value];
//     fetch(audioSrc)
//       .then((response) => response.blob())
//       .then((blob) => {
//         currentAudio = new Audio(URL.createObjectURL(blob));
//         currentAudio.play();
//       });
//   }
// };

const pauseAudio = (song) => {
  if (currentAudio) {
    currentAudio.pause();
    isPlaying.value = false;
    song.playing = false;
  }
};

const togglePlay = (song) => {
  if (isPlaying.value) {
    pauseAudio();
    isPlaying.value = false;
  } else {
    playAudio(song);
    isPlaying.value = true;
  }
};

//

// const playAudio = (song) => {
//   if (playingSongIndex.value !== -1) {
//     songs[playingSongIndex.value].playing = false;
//   }
//   playingSongIndex.value = song.index; // Update playing song index
//   song.playing = true;
//   isPlaying.value = true;
//   const audioSrc = song.audio[selectedLanguage.value];
//   fetch(audioSrc)
//     .then((response) => response.blob())
//     .then((blob) => {
//       currentAudio = new Audio(URL.createObjectURL(blob));
//       currentAudio.play();
//     });
// };

// const pauseAudio = () => {
//   if (currentAudio) {
//     currentAudio.pause();
//     isPlaying.value = false;
//     if (playingSongIndex.value !== -1) {
//       songs[playingSongIndex.value].playing = false; // Update song state
//     }
//   }
// };

// const togglePlay = (song) => {
//   if (isPlaying.value) {
//     pauseAudio();
//   } else {
//     playAudio(song);
//   }
// };

// pagination

const currentPage = ref(1);
const cardsPerPage = ref(4);

const paginatedSongs = computed(() => {
  const start = (currentPage.value - 1) * cardsPerPage.value;
  const end = start + cardsPerPage.value;
  return songs.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(songs.length / cardsPerPage.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// const playAudio = (song) => {
//   if (currentAudio) {
//     currentAudio.pause();
//   }
//   fetch(song.audio[selectedLanguage.value])
//     .then(response => response.blob())
//     .then(blob => {
//       const audio = new Audio(URL.createObjectURL(blob));
//       currentAudio = audio;
//       audio.play();
//     })
//     .catch(error => {
//       console.error("Audio playback interrupted:", error);
//     });
// };

// const playAudio = (audio) => {
//   if (currentAudio) {
//     currentAudio.pause();
//   }
//   currentAudio = audio;
//   audio.play().then(() => {
//     // Audio playback started successfully
//   }).catch(error => {
//     // Audio playback was interrupted or prevented
//   });
// };
</script>

<template>
  <!-- hero -->
  <!-- <div
    class="bg-contain h-screen"
    style="
      background-image: url('https://i.ibb.co.com/QpBpWP3/bg-img.jpg');
      filter: blur(8px);
      -webkit-filter: blur(1px);
    "
  ></div> -->
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Virtual Plan</a>
      <ul class="menu menu-horizontal rounded-box">
        <select
          v-model="selectedLanguage"
          class="select select-bordered w-full max-w-xs"
        >
          <option value="ina">Indonesia</option>
          <option value="eng">English</option>
          <option value="chn">Mandarin</option>
        </select>
      </ul>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-9">
        <li>
          <label class="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path
                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
              />
            </svg>
            <input
              type="checkbox"
              value="night"
              class="toggle theme-controller"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </li>
      </ul>
    </div>
  </div>
  <!-- table -->
  <!-- <div class="hero absolute top-12">
    <div
      class="hero-content bg-base-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100 rounded-md"
    >
      bg-base-100
      <div class="text-center">
        <h1 class="mb-2 text-base-content font-bold">Pilih Bahasa Audio</h1>
        <ul class="menu menu-horizontal rounded-box mb-6">
          <select
            v-model="selectedLanguage"
            class="select select-bordered w-full max-w-xs"
          >
            <option value="ina">Indonesia</option>
            <option value="eng">English</option>
            <option value="chn">Mandarin</option>
          </select>
        </ul>
      </div>
    </div>
  </div> -->

  <div class="grid grid-cols-2">
    <div
      v-for="(song, index) in paginatedSongs"
      :key="song.title"
      class="items-center text-center text-4xl"
    >
      <div class="hero bg-base-200">
        <div class="hero-content flex-col lg:flex-row">
          <div>
            <h1 class="text-5xl font-bold">{{ song.title }}</h1>
            <p class="py-6">
              {{ song.artist }}
            </p>
            <button
              class="w-24 h-24 rounded-full bg-blue-500 focus:outline-none"
              @click="playAudio(song)"
            >
              <font-awesome-icon :icon="song.playing ? 'pause' : 'play'" />
            </button>
          </div>
        </div>
      </div>
      <!-- <avatar></avatar> -->
    </div>
  </div>
  <div class="flex justify-center mt-4 join">
    <div class="justify-center">
      <button
        class="btn btn-sm btn-outline"
        @click="playAudio(songs[playingSongIndex])"
      >
        Play
      </button>
      <button
        class="btn btn-sm btn-outline"
        @click="pauseAudio"
        :disabled="!isPlaying"
      >
        Stop
      </button>
    </div>
  </div>
  <div class="fixed bottom-0 left-0 right-0 p-4 bg-base-100 shadow-md">
    <div class="flex justify-center">
      <button
        class="join-item btn btn-outline"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        Prev
      </button>
      <button
        class="join-item btn btn-outline"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
  <!-- <div class="flex justify-center mt-4 join">
    <button
      class="btn btn-sm btn-outline btn-prev"
      @click="prevPage"
      :disabled="currentPage === 1"
    >
      Prev
    </button>
    <button
      class="btn btn-sm btn-outline btn-next"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div> -->

  <!-- <div class="card" v-for="song in songs" :key="song.title">
    <h3>{{ song.title }}</h3>
    <p>Lokasi {{ song.artist }}</p>
    <audio :src="audioSrc(song)" controls></audio>
  </div> -->

  <!-- <div class="language-select">
    <label for="language">Language:</label>
    <select v-model="selectedLanguage" @change="changeLanguage">
      <option value="ina">Indonesian (INA)</option>
      <option value="eng">English (ENG)</option>
      <option value="chn">Chinese (CHN)</option>
    </select>
  </div> -->
</template>
