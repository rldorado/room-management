import { describe, it, expect, vi } from 'vitest'
import { useSnackbar } from './../useSnackbar'

describe('useSnackbar', () => {
  it('shows snackbar with correct text', () => {
    vi.useFakeTimers()
    const { snackbar, snackbarText, showSnackbar } = useSnackbar()

    showSnackbar('Test message')
    expect(snackbar.value).toBe(true)
    expect(snackbarText.value).toBe('Test message')

    vi.advanceTimersByTime(3000)
    expect(snackbar.value).toBe(false)

    vi.useRealTimers()
  })
})
