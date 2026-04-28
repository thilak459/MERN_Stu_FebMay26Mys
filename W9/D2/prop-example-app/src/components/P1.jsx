import {React} from "react";
// Props basics
// Child component
function WelcomeCard(props){
    return (
        <div className="card">
            <h2>Hello,{props.name}</h2>
            <p>Role: {props.role}</p>
        </div>
    );
}
// Parent component
export function PropBasics(){
    return (
        <>
            <WelcomeCard name="Rakesh" role="React developer"/>
            <WelcomeCard name="Developer" role="UI/UX developer"/>
        </>
    );
}