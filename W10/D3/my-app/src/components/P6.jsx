// Event Delegation in React
// Instead of attaching a seperate click handler to every element we attach one handler to the parent
// Parent -> Child
// Bubbles up to the parent

import { useState } from "react";

// Why is it used?
// Reduces repeated event handlers
// Code is cleaner and manageble
// Its useful when rendering many similar items

export function EventDeligation(){
    const [selectedItem, setSelectedItem] = useState('None');

    // Parent click handler
    const handleListClick = (event) => {
        const clickedItem = event.target.closest('li[data-item]');

        if(!clickedItem) return;

        const itemName = clickedItem.dataset.item;
        console.log('Clicked Item: ',itemName);
        setSelectedItem(itemName);
    };
    return(
        <section>
            <h2>Event delegation</h2>
            <ul onClick={handleListClick}>
                <li data-item="Laptop">Laptop</li>
                <li data-item="Mobile phone">Mobile Phone</li>
                <li data-item="Car">Car</li>
            </ul>
            <p>Selected: {selectedItem}</p>
        </section>
    );
}