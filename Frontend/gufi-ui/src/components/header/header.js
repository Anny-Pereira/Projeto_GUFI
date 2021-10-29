import React,{Component} from "react";
import logo from '../../assets/img/logo.png'


export default function Header(){

    return(
        <header className="cabecalhoPrincipal">
                    <div className="container">
                    <img src={logo}
                    alt="Logo da Gufi" />

                    <nav className="cabecalhoPrincipal-nav">
                        Administrador
                    </nav>
                    </div>
                </header>
    )
}