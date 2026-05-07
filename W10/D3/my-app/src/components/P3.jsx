import { useState } from "react";

// Passing arguments to Event Handler
export function PassingArguments(){
    const [message, setMessage] = useState('No message yet');
    // Event handler function
    const handleClick = (msg) => {
        setMessage(msg);
    };
    return(
        <section>
            <h2>Passing Arguments</h2>
            <button onClick={() => handleClick("Namaste")}>
                Click me
            </button>
            <p>Message: {message}</p>
        </section>
    )
}