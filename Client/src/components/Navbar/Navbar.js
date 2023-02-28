import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import jwt_decode  from "jwt-decode";


export default function Navbar() {
    const token = localStorage.getItem('YourToken')
    const checkTokenInterval = setInterval(() => {
        const storedToken = localStorage.getItem('YourToken');
        if (storedToken) {
            const decodedToken = jwt_decode(storedToken);
            if (decodedToken.exp < Date.now() / 1000) {
                localStorage.removeItem('YourToken');
                clearInterval(checkTokenInterval);
            }
        } else {
            clearInterval(checkTokenInterval);
        }
    }, 1000);
    return (
        <div class="wrapper">
            <nav>
                <input type="checkbox" id="show-search" />
                <input type="checkbox" id="show-menu" />
                <label for="show-menu" class="menu-icon"><i class="fas fa-bars"></i></label>
                <div class="content">
                    <div class="logo"><Link to={'/'}>Blogpurr</Link></div>
                    <ul class="links">
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/'}>About</Link></li>
                        <li>
                            <Link to={'/'} class="desktop-link">Categories</Link>
                            <input type="checkbox" id="show-features" />
                            <label for="show-features">Features</label>
                            <ul>
                                <li><Link to={'/'}>Personal Blog</Link></li>
                                <li><Link to={'/'}>Food Blog</Link></li>
                                <li><Link to={'/'}>Fashion Blog</Link></li>
                                <li><Link to={'/'}>Travel Blog</Link></li>
                                <li><Link to={'/'}>Technology Blog</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to={'/'} class="desktop-link">Services</Link>
                            <input type="checkbox" id="show-services" />
                            <label for="show-services">Services</label>
                            <ul>
                                <li><Link to={'/'}>Blog posts</Link></li>
                                <li><Link to={'/'}>Product reviews</Link></li>
                            </ul>
                        </li>
                        <li><Link to={token ? '/profile' : '/login'}>{token ? "Profile" : "Login"}</Link></li>
                    </ul>
                </div>
                <label for="show-search" class="search-icon"><i class="fas fa-search"></i></label>
                <form action="#" class="search-box">
                    <input type="text" placeholder="Type Something to Search..." required style={{ marginTop: -5 }} />
                    <button type="submit" class="go-icon"><i class="fas fa-long-arrow-alt-right"></i></button>
                </form>
            </nav>
        </div>
    )
}