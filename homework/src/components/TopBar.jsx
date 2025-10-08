import './TopBar.css'

export default function TopBar({logout}){

    const username = localStorage.getItem('username')
    
    return <header>
        <h1>{username}</h1>
        <button onClick={() => logout()}>Logout</button>
    </header>
}