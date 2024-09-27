<template>
    <div class="audio-player">
      <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
      <button @click="stopAudio" :disabled="!isPlaying">Stop</button>
      <input
        type="range"
        min="0"
        :max="duration"
        :value="currentTime"
        @input="seek"
        class="slider"
      />
      <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue';
  
  const props = defineProps({
    src: String,
    isPlaying: Boolean
  });
  
  const emit = defineEmits(['play', 'pause', 'stop', 'seek']);
  
  const audio = ref(new Audio(props.src));
  const currentTime = ref(0);
  const duration = ref(0);
  
  const togglePlay = () => {
    if (audio.value.paused) {
      audio.value.play();
      emit('play');
    } else {
      audio.value.pause();
      emit('pause');
    }
  };
  
  const stopAudio = () => {
    audio.value.pause();
    audio.value.currentTime = 0;
    emit('stop');
  };
  
  const seek = (event) => {
    audio.value.currentTime = event.target.value;
    emit('seek', event.target.value);
  };
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  watch(() => props.src, (newSrc) => {
    audio.value.src = newSrc;
    audio.value.load();
  });
  
  const updateTimes = () => {
    currentTime.value = audio.value.currentTime;
    duration.value = audio.value.duration;
  };
  
  onMounted(() => {
    audio.value.addEventListener('timeupdate', updateTimes);
    audio.value.addEventListener('ended', () => emit('stop'));
  });
  
  onUnmounted(() => {
    audio.value.removeEventListener('timeupdate', updateTimes);
    audio.value.pause();
  });
  </script>
  
  <style scoped>
  .audio-player {
    display: flex;
    align-items: center;
  }
  .slider {
    margin: 0 10px;
  }
  </style>
  