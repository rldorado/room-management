import { ref } from 'vue'

export const useSnackbar = () => {
  const snackbar = ref<boolean>(false)
  const snackbarText = ref<string>('')

  const showSnackbar = (text: string) => {
    snackbarText.value = text
    snackbar.value = true
    setTimeout(() => {
      snackbar.value = false
    }, 3000)
  }

  return {
    snackbar,
    snackbarText,
    showSnackbar
  }
}

export default useSnackbar
