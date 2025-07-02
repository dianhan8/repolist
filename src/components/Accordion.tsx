import React, { useState } from 'react';
import cn from 'classnames';
import { AccordionItemContext } from '../contexts/AccordionItemContext';

interface AccordionItemProps {
    header: React.ReactNode;
    children: React.ReactNode;
    testId?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = (props) => {
    const { header, children } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="accordion-item">
            <div
                className="accordion-item--header"
                role="button"
                onClick={toggleOpen}
            >
                {header}

                <svg className={cn("icon", { 'accordion-item--header--icon--open': isOpen })} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>


            <div className={cn("accordion-item--content", {
                'hidden': !isOpen
            })}>
                <AccordionItemContext.Provider value={{ isOpen }}>
                    {children}
                </AccordionItemContext.Provider>
            </div>
        </div>
    )
}

interface AccordionProps {
    children: React.ReactNode;
}
export const Accordion: React.FC<AccordionProps> = (props) => {
    const { children } = props;

    return (
        <div>
            {React.Children.map(children, (child) => child)}
        </div>
    )
}