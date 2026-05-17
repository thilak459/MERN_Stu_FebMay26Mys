// Multiple Dynamic params
import {useParams} from "react-router-dom";

export function MultipleDynamicParams(){
    const {userId,orderId} = useParams();
    return(
        <div>
            <h2>Multiple Dynamic Params</h2>
            <p>Used ID from URL : {userId}</p>
            <p>OrderID from URL : {orderId}</p>
        </div>
    );
}