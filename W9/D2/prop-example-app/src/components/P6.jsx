// Composition 
// import React from "react";

function DashboardLayout({children}){
    return <div className="layout">{children}</div>
}
function AccountSidebar({children}){
    return <aside className="sidebar">{children}</aside>
}
function UserInfoPanel({children}){
    return <aside className="user-panel">{children}</aside>
}
function ProfileAvatar({ user }){
    return <img src={`/${user.name}.jpeg`} alt={user.name} height={500}/>
}
export function CompositionDemo(){
    const user = {name: "Rakesh"};
    return(
        <div>
            <h3>Composition Solution</h3>
            <DashboardLayout>
                <AccountSidebar>
                    <UserInfoPanel>
                        <ProfileAvatar user={user} />
                    </UserInfoPanel>
                </AccountSidebar>
            </DashboardLayout>
        </div>
    )
}