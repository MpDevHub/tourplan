<script setup>

import { songs } from "../songs"; // Import your data source

</script>

<template>
  <div class="hero bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
      <div>
        <h1 class="text-5xl font-bold">{{ songs.title }}</h1>
        <p class="py-6">
          {{ songs.artist }}
        </p>
        <button
          class="w-24 h-24 rounded-full bg-blue-500 focus:outline-none"
          @click="playAudio(song)"
        >
          <font-awesome-icon :icon="songs.playing ? 'pause' : 'play'" />
        </button>
      </div>
    </div>
  </div>
</template>
