import { beforeEach, test } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import App from '@/App.vue'

beforeEach(() => {
  render(App)
})

test('entering a name generates the correct YAML', async () => {
  const name = screen.getByLabelText('Name')

  await fireEvent.update(name, 'workflow')

  screen.getByText(/name: workflow/i)
})

test('selecting triggers generates the correct YAML', async () => {
  const onPush = screen.getByLabelText('on push')

  await fireEvent.click(onPush)

  screen.getByText(/on:\s+push:\s+branches:\s+-\s+main/i)

  const onPullRequest = screen.getByLabelText('on pull request')

  await fireEvent.click(onPullRequest)

  screen.getByText(
    /on:\s+push:\s+branches:\s+-\s+main\s+pull_request:\s+branches:\s+-\s+main/i,
  )
})

test('selecting a database generates the correct YAML', async () => {
  const select = screen.getByLabelText('Database')

  await fireEvent.update(select, 'postgres')

  screen.getByText(/services:\s+pgsql:\s+image: postgres:15/i)

  await fireEvent.update(select, 'mysql')

  screen.getByText(/services:\s+mysql:\s+image: mysql:8.0/i)
})

test('selecting a PHP version generates the correct YAML', async () => {
  const select = screen.getByLabelText('PHP version')

  await fireEvent.update(select, '8.2')

  screen.getByText(/name: Set up PHP\s+with:\s+php-version: 8.2/i)
})

test('selecting a Node version generates the correct YAML', async () => {
  const select = screen.getByLabelText('Node version')

  await fireEvent.update(select, '18')

  screen.getByText(/name: Set up Node.js\s+with:\s+node-version: 18/i)
})

test('selecting a way to test generates the correct YAML', async () => {
  const none = screen.getByLabelText('No tests')

  await fireEvent.click(none)

  const phpunit = screen.getByRole('radio', { name: 'PHPUnit' })

  await fireEvent.click(phpunit)

  screen.getByText(/name: Run tests\s+run: vendor\/bin\/phpunit --testdox/i)

  const pest = screen.getByRole('radio', { name: 'Pest' })

  await fireEvent.click(pest)

  screen.getByText(/name: Run tests\s+run: vendor\/bin\/pest --parallel/i)
})

test('selecting static analysis generates the correct YAML', async () => {
  const none = screen.getByLabelText('No static analysis')

  await fireEvent.click(none)

  const larastan = screen.getByRole('radio', { name: 'Larastan' })

  await fireEvent.click(larastan)

  screen.getByText(
    /name: Run Static Analysis\s+run: vendor\/bin\/phpstan analyse app --level=5/i,
  )
})
