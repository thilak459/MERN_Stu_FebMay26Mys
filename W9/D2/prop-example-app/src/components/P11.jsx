// Prop validation
import {PropTypes} from "prop-types";
function Profile({name="Thilak",age=22}){
    return(
        <div className="card">
            <p>{name}</p>
            <p>{age}</p>
        </div>
    );
}
Profile.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
};
export function PropTypesDemo(){
    return(
        <>
            <Profile />
        </>
    );
}