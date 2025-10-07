import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
    const {token, logout} = useAuth();

    const handleLogout = () => {
        logout();
    }
    if (!token) return null;
  return (
    <div className='navbar'>
        <ul className='nav'>
            <li><a href="/home">Home</a></li>
            <li><a href="/contacts">Contacts</a></li>
            <li><a href="/contacts/add">Add new contact</a></li>
        </ul>
        <div className='searchbar'>
            <form action="/contacts">
                <input type="text" placeholder='Search...' name='query'/>
                <button type='submit'>Search</button>
            </form>
        </div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar
