import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Post Scheduler', () => {
  it('renders the application', () => {
    render(<App />)

    expect(
      screen.getByText('Post Scheduler'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Rendering Performance'),
    ).toBeInTheDocument()
  })
})