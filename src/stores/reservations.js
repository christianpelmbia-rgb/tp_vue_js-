import { defineStore } from 'pinia'
import { ref } from 'vue'

const KEY = 'biblio:reservations'

export const useReservationsStore = defineStore('reservations', () => {
  const items = ref(JSON.parse(localStorage.getItem(KEY) ?? '[]'))

  function add(reservation) {
    items.value.push({
      ...reservation,
      date: new Date().toISOString(),
    })
    localStorage.setItem(KEY, JSON.stringify(items.value))
  }

  function has(bookId) {
    return items.value.some((r) => r.bookId === bookId)
  }

  return { items, add, has }
})
