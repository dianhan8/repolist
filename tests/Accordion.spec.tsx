import { expect, test, vi, describe } from 'vitest'
import { render } from 'vitest-browser-react';
import { Accordion, AccordionItem } from '../src/components/Accordion';

describe('Accordion Component Tests', () => {
    test('Accordion renders with items', () => {
        const items = [
            { title: 'Item 1', content: 'Content 1' },
            { title: 'Item 2', content: 'Content 2' }
        ];

        const { getByText } = render(
            <Accordion>
                {items.map((item, index) => (
                    <AccordionItem key={index} header={item.title}>
                        {item.content}
                    </AccordionItem>
                ))}
            </Accordion>
        );

        items.forEach(item => {
            expect(getByText(item.title)).toBeInTheDocument();
            expect(getByText(item.content)).toBeInTheDocument();
        });
    })

    test('AccordionItem toggles open state on header click', async () => {
        const { getByText, container } = render(
            <Accordion>
                <AccordionItem header="Item 1">Content 1</AccordionItem>
            </Accordion>
        );

        const header = getByText('Item 1');
        const content = container.querySelector('.accordion-item--content');

        expect(content).toHaveClass('hidden');

        await header.click();

        expect(content).not.toHaveClass('hidden');
    });
})