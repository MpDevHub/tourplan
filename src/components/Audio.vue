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

const playAudio = (audio) => {
  if (currentAudio) {
    currentAudio.pause();
  }
  currentAudio = audio;
  audio.play();
};
</script>

<template>
  <div class="navbar bg-base-100">
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

  <!-- hero -->

  <div class="hero">
    <div class="hero-content">
      <div class="text-center">
        <p>Pilih Bahasa</p>
        <ul class="menu menu-horizontal bg-base-200 rounded-box">
          <select v-model="selectedLanguage" class="select select-bordered w-full max-w-xs">
            <option value="ina">Indonesia</option>
            <option value="eng">English</option>
            <option value="chn">Mandarin</option>
          </select>
        </ul>
        <div class="overflow-x-auto">
          <table class="table table-sm">
            <!-- head -->
            <thead>
              <tr>
                <th>No</th>
                <th>Area</th>
                <th>Audio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="song in songs" :key="song.title">
                <td><div class="badge badge-info badge-lg">{{ song.title }}</div></td>
                <td>{{ song.artist }}</td>
                <td>
                  <audio :src="audioSrc(song)" @play="playAudio($event.target)" controls></audio>
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
