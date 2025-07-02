import React from 'react';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

export const useAccordion = () => {
    const context = React.useContext(AccordionItemContext);
    if (!context) {
        throw new Error("useAccordion must be used within an AccordionItem");
    }
    return context;
}