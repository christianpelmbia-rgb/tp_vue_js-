import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactView from '@/views/ContactView.vue'

describe('ContactView', () => {
  it('affiche les 3 champs obligatoires et le bouton de soumission', () => {
    const wrapper = mount(ContactView)

    expect(wrapper.find('input#name').exists()).toBe(true)
    expect(wrapper.find('input#email').exists()).toBe(true)
    expect(wrapper.find('textarea#message').exists()).toBe(true)
    expect(wrapper.text()).toContain('Envoyer le message')
  })

  it('affiche des erreurs de validation si le formulaire est envoyé vide', async () => {
    const wrapper = mount(ContactView)

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Votre nom est requis')
    expect(wrapper.text()).toContain('Veuillez saisir une adresse e-mail valide')
    expect(wrapper.text()).toContain('Le message doit contenir au moins 10 caractères')
  })

  it('affiche le message de confirmation si les données sont valides', async () => {
    const wrapper = mount(ContactView)

    await wrapper.find('input#name').setValue('Sophie Germain')
    await wrapper.find('input#email').setValue('sophie@example.com')
    await wrapper.find('textarea#message').setValue('Bonjour, je souhaite réserver un livre disponible.')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Message envoyé avec succès')
  })
})
