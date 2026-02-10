<template>
  <div class="container">
    <div class="card">
      <h1>💖 Unsere Listen</h1>

      <!-- Neue Liste erstellen -->
      <div class="new-list">
        <input v-model="newList" placeholder="Neue Liste..." />
        <button @click="createList">+</button>
      </div>

      <!-- Listen-Auswahl -->
      <div class="lists">
        <button
          v-for="list in listStore.lists"
          :key="list.id"
          @click="listStore.loadItems(list.id)"
          :class="{ active: listStore.activeListId === list.id }"
        >
          {{ list.name }}
        </button>
      </div>

      <!-- Neue Items -->
      <div class="new-item">
        <input v-model="newItem" placeholder="Neuer Eintrag..." />
        <button @click="addNewItem">+</button>
      </div>

      <!-- Items der aktiven Liste -->
      <ul>
        <li v-for="item in listStore.items" :key="item.id" class="item">
          {{ item.text }}
          <button @click="listStore.removeItem(item.id)" class="delete">❌</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useListStore } from "@/stores/listStore";

const listStore = useListStore();
const newItem = ref("");
const newList = ref("");

onMounted(() => {
  listStore.loadLists();
});

async function addNewItem() {
  if (!newItem.value.trim()) return;
  await listStore.addItem(newItem.value);
  newItem.value = "";
}

async function createList() {
  if (!newList.value.trim()) return;
  await listStore.addList(newList.value);
  newList.value = "";
}
</script>

<style>
/* Grundlayout */
.container {
  min-height: 100vh;
  background-color: #ffe6f0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
}

.card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Überschrift */
h1 {
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

/* Neue Liste */
.new-list,
.new-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.new-list input,
.new-item input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.new-list button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 0.75rem;
  cursor: pointer;
}

.new-item button {
  background-color: #ff69b4;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 0.75rem;
  cursor: pointer;
}

/* Listen-Auswahl */
.lists {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.lists button {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}

.lists button.active {
  background-color: #ff69b4;
  color: white;
  border-color: #ff69b4;
}

/* Items */
ul {
  list-style: none;
  padding: 0;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.item .delete {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}
</style>
