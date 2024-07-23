<script setup>
import { ref, computed } from "vue";
import { songs } from "../songs"; // Import your data source

const selectedLanguage = ref("ina");
let currentAudio = null;

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

const playAudio = (audio) => {
  if (currentAudio) {
    currentAudio.pause();
  }
  currentAudio = audio;
  // audio.load();
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise
      .then((_) => {
        // Audio started playing successfully!
      })
      .catch((error) => {
        // Playback was interrupted (handle the error)
        console.error("Audio playback interrupted:", error);
      });
  }
};

// const playAudio = (song) => {
//   const audioSrc = song.audio[selectedLanguage.value];
//   fetch(audioSrc)
//    .then(response => response.blob())
//    .then(blob => {
//       const audio = new Audio(URL.createObjectURL(blob));
//       if (currentAudio) {
//         currentAudio.pause();
//       }
//       currentAudio = audio;
//       audio.play();
//     });
// };

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
  <div
    class="bg-cover bg-center h-screen"
    style="
      background-image: url('https://jembo.co.id/uploads/img/slider/20200428132012-kabel-dengan-kualitas-terbaik.jpg');
      filter: blur(8px);
      -webkit-filter: blur(8px);
    "
  ></div>
  <div class="navbar bg-base-100 absolute top-0">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Virtual Plan</a>
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
              value="bumblebee"
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
  <div class="hero absolute top-24">
    <div class="hero-content bg-base-100 rounded-md">
      <div class="text-center">
        <h1 class="mb-2 font-bold bg-base-100">Pilih Bahasa Audio</h1>
        <ul class="menu menu-horizontal bg-base-200 rounded-box mb-6">
          <select
            v-model="selectedLanguage"
            class="select select-bordered w-full max-w-xs"
          >
            <option value="ina">Indonesia</option>
            <option value="eng">English</option>
            <option value="chn">Mandarin</option>
          </select>
        </ul>
        <div class="h-96 overflow-x-auto">
          <table class="table table-xs table-pin-rows">
            <!-- head -->
            <thead class="font-bold">
              <tr>
                <th>No</th>
                <th>Kode Area</th>
                <th>Area</th>
                <th>Mark</th>
                <th>Audio</th>
              </tr>
            </thead>
            <tbody class="bg-base-100">
              <tr v-for="(song, index) in songs" :key="song.title">
                <!-- <td><input type="checkbox" checked="checked" class="checkbox checkbox-warning" /></td> -->
                <td>{{ index + 1 }}</td>
                <td>
                  <!-- <div
                    :class="
                      song.title === 'J1' ||
                      song.title === 'J2' ||
                      song.title === 'J3' ||
                      song.title === 'J4' ||
                      song.title === 'J5'
                        ? 'badge badge-success badge-lg'
                        : 'badge badge-info badge-lg'
                    "
                  >
                    {{ song.title }}
                  </div> -->
                  <div
                    v-if="song.title.startsWith('J')"
                    class="badge badge-success badge-lg"
                  >
                    {{ song.title }}
                  </div>
                  <div
                    v-else-if="song.title.startsWith('A')"
                    class="badge badge-warning badge-lg"
                  >
                    {{ song.title }}
                  </div>
                  <div
                    v-else-if="song.title.startsWith('B')"
                    class="badge badge-error badge-lg"
                  >
                    {{ song.title }}
                  </div>
                  <div
                    v-else-if="song.title.startsWith('C')"
                    class="badge badge-accent badge-lg"
                  >
                    {{ song.title }}
                  </div>
                  <div v-else class="badge badge-info badge-lg">
                    {{ song.title }}
                  </div>
                </td>
                <td>{{ song.artist }}</td>
                <td>
                  <input type="checkbox" class="checkbox checkbox-warning" />
                </td>
                <td>
                  <audio
                    :src="audioSrc(song)"
                    preload="auto"
                    @play="playAudio($event.target)"
                    controls
                  ></audio>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

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
