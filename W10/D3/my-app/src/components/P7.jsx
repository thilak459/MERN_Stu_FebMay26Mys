// Common form patterns
// Controlled component
// A form input whose values is controlled by the React state

import { useState } from "react";

export function FormsPattern(){
    const [name, setName] = useState('');
    const [submittedName, setSubmittedName] = useState('');

    // input Handler
    const handleChange = (event) => {
        setName(event.target.value);
    };
    // Form submit handler
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmittedName(name);
    };
    return(
        <section>
            <h2>Form Pattern</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={handleChange} placeholder="Enter your name" />
                <button type="submit">Submit</button>
            </form>
            <p>You have Typed the name as: {name}</p>
            <p>Submitted: {submittedName}</p>
        </section>
    );
}