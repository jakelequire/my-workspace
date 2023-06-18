"use client"
// primaryElement.tsx
import HomepageInterface from "./homepage/homepageInterface"
import BankingInterface from "./banking/bankingInterface"
import ToDoInterface from "./todo/todoInterface"

import { usePageStateContext } from './PageStateContext';

export default function PrimaryElement() {
    const { page } = usePageStateContext()

    let currentPage;
    switch (page) {
        case 'home':
            currentPage = <HomepageInterface />;
            break;
        case 'banking':
            currentPage = <BankingInterface />;
            break;
        case 'todo':
            currentPage = <ToDoInterface />;
            break;
        case 'reminders':
            currentPage = <></>;
            break;
        case 'documents':
            currentPage = <></>;
            break;
    }

    return (
        <main style={styles}>
            {currentPage}
        </main>
    )
}

const styles = {
    display: 'flex',
    height: '100%',
    width: '100%',
}