import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookCard from '../BookCard.vue'

describe('BookCard', () => {
  const fakeBook = {
    id: 1,
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    cover: '/covers/petit-prince.svg',
    available: true,
  }

  it('affiche le titre et l\'auteur du livre', () => {
    const wrapper = mount(BookCard, {
      props: { book: fakeBook, favorite: false },
    })

    expect(wrapper.text()).toContain('Le Petit Prince')
    expect(wrapper.text()).toContain('Antoine de Saint-Exupéry')
    expect(wrapper.text()).toContain('Disponible')
  })

  it('émet un événement toggle-favorite au clic sur le bouton favori', async () => {
    const wrapper = mount(BookCard, {
      props: { book: fakeBook, favorite: false },
    })

    const button = wrapper.find('button.book-card__fav')
    await button.trigger('click')

    expect(wrapper.emitted('toggle-favorite')).toBeTruthy()
    expect(wrapper.emitted('toggle-favorite')[0]).toEqual([1])
  })

  it('affiche la classe et le libellé emprunté si non disponible', () => {
    const borrowedBook = { ...fakeBook, available: false }
    const wrapper = mount(BookCard, {
      props: { book: borrowedBook, favorite: true },
    })

    expect(wrapper.text()).toContain('Emprunté')
    expect(wrapper.find('.book-card__status--off').exists()).toBe(true)
    expect(wrapper.text()).toContain('★ Retirer des favoris')
  })
})
