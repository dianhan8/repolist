import { expect, test, vi, describe } from 'vitest'
import { render } from 'vitest-browser-react';
import { EmptyState } from '../src/components/EmptyState';

describe('EmptyState Component Tests', () => {
    test('EmptyState renders with default message', () => {
        const { getByTestId } = render(<EmptyState testId='empty-state' />)
        const emptyStateElement = getByTestId('empty-state')

        expect(emptyStateElement).toBeInTheDocument()
        expect(emptyStateElement).toHaveTextContent('No data available')
    })

    test('EmptyState renders with custom message', () => {
        const customMessage = 'No users found'
        const { getByTestId } = render(<EmptyState message={customMessage} testId='empty-state' />)
        const emptyStateElement = getByTestId('empty-state')

        expect(emptyStateElement).toBeInTheDocument()
        expect(emptyStateElement).toHaveTextContent(customMessage)
    })
})