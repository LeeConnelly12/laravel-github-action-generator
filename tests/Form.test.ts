import { beforeEach, test } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import App from '@/App.vue'

beforeEach(() => {
  render(App)
})

test('entering a name generates the correct yaml', async () => {
  const nameInput = screen.getByLabelText('Name')

  await fireEvent.update(nameInput, 'workflow')

  screen.getByText(/name: workflow/i)
})

test('selecting triggers generates the correct yaml', async () => {
  const onPushCheckbox = screen.getByLabelText('on push')

  await fireEvent.click(onPushCheckbox)

  screen.getByText(/on:\s+push:\s+branches:\s+-\s+main/i)

  const onPullRequestCheckbox = screen.getByLabelText('on pull request')

  await fireEvent.click(onPullRequestCheckbox)

  screen.getByText(
    /on:\s+push:\s+branches:\s+-\s+main\s+pull_request:\s+branches:\s+-\s+main/i,
  )
})
