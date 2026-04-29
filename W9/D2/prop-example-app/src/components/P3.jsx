// Container/ wrapper component
import {React} from "react";
// children is a special react prop
// It holds nested JSX passed between component tags
// Is helps create reusable wrapper/layout components
function Container({children}){
    return(
        <div className="card">
            {children}
        </div>
    );
}
// Parent component
export function PropsChildren(){
    return(
        <>
            <Container>
                <h3>First child element in Nested approach</h3>
            </Container>
        </>
    )
}