<script setup>
import TheWelcome from '../components/TheWelcome.vue'
 
import {useCounterStore} from '../stores/counter'
</script>

<template>
  <main>
 
    <a href="/listen" class="btn">Zu den Listen</a>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
  min-height: 100vh;
  background-color: #ffe6f0;
}


.btn {
  background-color: #ff69b4;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}
</style>  