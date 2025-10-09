import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router';

const Navbar = () => {
    const {token, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.elements.query.value;
        navigate(`/contacts?query=${encodeURIComponent(query)}`);
        window.location.reload();
    }
    if (!token) return null;
  return (
    <div className='navbar'>
        <ul className='nav'>
            <li><a href="/">Home</a></li>
            <li><a href="/contacts">Contacts</a></li>
            <li><a href="/contacts/add">Add new contact</a></li>
        </ul>
        <div className='searchbar'>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder='Search...' name='query'/>
                <button type='submit'>Search</button>
            </form>
        </div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar
