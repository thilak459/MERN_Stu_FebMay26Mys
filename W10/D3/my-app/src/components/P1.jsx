// Basic events in React
// What is an Event?
// An action triggerd by the user (mouse, keyboard, DOM).
// React uses camelCase attributes like onClick, onChange..
// React passes an event object (SyntheticEvent) to the handler

export function EventBasics(){
    // Declaring the event handler function
    const handleClick = () => alert("Clicked");
    return(
        <section>
            <h2>Basic Events</h2>
            {/* Event bindinig */}
            <button onClick={handleClick}>
                Click me
            </button>
        </section>
    );
}