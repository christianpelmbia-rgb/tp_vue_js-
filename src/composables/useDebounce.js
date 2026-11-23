import { ref, watch, onScopeDispose } from 'vue'

export function useDebounce(source, delay = 300) {
  const debounced = ref(source.value)
  let timer

  watch(source, (value) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      debounced.value = value
    }, delay)
  })

  onScopeDispose(() => clearTimeout(timer))

  return debounced
}
