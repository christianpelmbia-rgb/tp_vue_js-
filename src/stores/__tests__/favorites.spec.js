import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { nextTick } from 'vue'
import { useFavoritesStore } from '../favorites'

describe('useFavoritesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('ajoute et retire un favori via toggle', () => {
    const store = useFavoritesStore()
    expect(store.count).toBe(0)
    expect(store.has(1)).toBe(false)

    store.toggle(1)
    expect(store.count).toBe(1)
    expect(store.has(1)).toBe(true)

    store.toggle(1)
    expect(store.count).toBe(0)
    expect(store.has(1)).toBe(false)
  })

  it('persiste les favoris dans localStorage', async () => {
    const store = useFavoritesStore()
    store.toggle(3)
    store.toggle(7)

    await nextTick()

    const stored = JSON.parse(localStorage.getItem('biblio:favorites'))
    expect(stored).toEqual([3, 7])
  })
})
