import React from "react";
import logo from '../../assets/img/logo.png';
import  {Link}  from 'react-router-dom';


export default function Header() {

    return (
        <header className="cabecalhoPrincipal">
            <div className="container">
                <img src={logo}
                    alt="Logo da Gufi" />
                <Link to="/">
                    <img src={logo} alt="Logo da Gufi" />{' '}
                </Link>
                <nav className="cabecalhoPrincipal-nav">
                    Administrador
                </nav>
                
                {/* COMPONENTE PERFILFOTO */}
            </div>
        </header>
    )
}