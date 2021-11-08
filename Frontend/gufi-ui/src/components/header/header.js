import React, { Component } from "react";
import logo from '../../assets/img/logo.png'


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

                <nav className="perfilHeader">
                    <img alt="Imagem do Perfil" src={`data:image;base64,${this.state.base64img}`}></img>
                </nav>
            </div>
        </header>
    )
}