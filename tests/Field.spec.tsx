import { expect, test, vi, describe } from 'vitest'
import { render } from 'vitest-browser-react';
import { Field } from '../src/components/Field';

describe('Field Component Tests', () => {
    test('Field onChange Test', async () => {
        const initialValue = ''
        const testValue = 'test value'
        const mockOnChange = vi.fn()

        const { getByRole } = render(<Field onChange={mockOnChange} value={initialValue} />)
        const field = getByRole('textbox')

        await expect.element(field).toBeInTheDocument()
        await expect.element(field).toHaveValue(initialValue)

        await field.fill(testValue)

        expect(mockOnChange).toHaveBeenCalled()
    })

    test('Field value Test', async () => {
        const initialValue = 'initial value'
        const mockOnChange = vi.fn()

        const { getByRole } = render(<Field onChange={mockOnChange} value={initialValue} />)
        const field = getByRole('textbox')

        await expect.element(field).toBeInTheDocument()
        await expect.element(field).toHaveValue(initialValue)

        expect(mockOnChange).not.toHaveBeenCalled()
    })
})