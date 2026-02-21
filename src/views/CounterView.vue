<template>
  <div class="container">
    <div class="card">
      
      <div class="countdown">
        <div class="time-box">
          <span>{{ days }}</span>
          <p>Tage</p>
        </div>
        <div class="time-box">
          <span>{{ hours }}</span>
          <p>Stunden</p>
        </div>
        <div class="time-box">
          <span>{{ minutes }}</span>
          <p>Minuten</p>
        </div>
        <div class="time-box">
          <span>{{ seconds }}</span>
          <p>Sekunden</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Countdown-Ziel
const targetDate = new Date("2026-02-27T19:53:00");

// Countdown Variablen
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

let timer;

// Funktion zum Berechnen
function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    days.value = hours.value = minutes.value = seconds.value = 0;
    clearInterval(timer);
    return;
  }

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24);
  minutes.value = Math.floor((diff / (1000 * 60)) % 60);
  seconds.value = Math.floor((diff / 1000) % 60);
}

onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #ffe6f0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background-color: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 1.75rem;
  margin-bottom: 2rem;
}

.countdown {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.time-box {
  background-color: #f0f0f0;
  padding: 1rem 1.5rem;
  border-radius: 10px;
}

.time-box span {
  display: block;
  font-size: 2rem;
  font-weight: bold;
}

.time-box p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}
</style>
