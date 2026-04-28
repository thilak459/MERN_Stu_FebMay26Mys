import {React} from "react";
// List renedring
const users = [
    {id:1, role: "Student"},
    {id:2, role: "Trainer"},
    {id:3, role: "Admin"},
    {id:4, role: "Developer"}
];

export function FunctionComp(){
    return(
        <div>
            <h2>Functional Component</h2>
            {/* List rendering */}
            {users.map((user)=>(
                <p className="box" key={user.id}>
                    {user.role}
                </p>
            ))}
        </div>
    );
}