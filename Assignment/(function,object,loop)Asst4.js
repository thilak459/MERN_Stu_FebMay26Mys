const getRoute=function getRoute(role,isLoggedIn){
    if(!isLoggedIn){
        return "/login";
    }
    switch(role){
        case "admin":
            return "/admin";
        case "student":
            return "/student";
        case "college":
            return "/college";
        case "proctor":
            return "/proctor";
        default:
            return "/denied";
            break;
    }
}
console.log(getRoute("admin",true));
console.log(getRoute("student",true));
console.log(getRoute("person",true));
console.log(getRoute());
