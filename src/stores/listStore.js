import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

export const useListStore = defineStore("list", () => {
  const lists = ref([]); // Alle Listen
  const items = ref([]); // Items der aktiven Liste
  const activeListId = ref(null); // Welche Liste gerade aktiv ist

  // Alle Listen aus Firebase laden
  async function loadLists() {
    const snapshot = await getDocs(collection(db, "lists"));
    lists.value = snapshot.docs.map(d => ({ id: d.id, name: d.data().name }));
    if (lists.value.length > 0) activeListId.value = lists.value[0].id;
    if (activeListId.value) loadItems(activeListId.value);
  }

  // Items einer Liste laden
  async function loadItems(listId) {
    activeListId.value = listId;
    const q = query(collection(db, "items"), where("listId", "==", listId));
    const snapshot = await getDocs(q);
    items.value = snapshot.docs.map(d => ({ id: d.id, text: d.data().text }));
  }

  // Neue Liste erstellen
  async function addList(name) {
    if (!name.trim()) return;
    const docRef = await addDoc(collection(db, "lists"), { name });
    lists.value.push({ id: docRef.id, name });
    activeListId.value = docRef.id;
    items.value = [];
  }

  // Neues Item hinzufügen
  async function addItem(text) {
    if (!text.trim() || !activeListId.value) return;
    const docRef = await addDoc(collection(db, "items"), { text, listId: activeListId.value });
    items.value.push({ id: docRef.id, text });
  }

  // Item löschen
  async function removeItem(id) {
    await deleteDoc(doc(db, "items", id));
    items.value = items.value.filter(i => i.id !== id);
  }

  return {
    lists,
    items,
    activeListId,
    loadLists,
    loadItems,
    addList,
    addItem,
    removeItem,
  };
});
