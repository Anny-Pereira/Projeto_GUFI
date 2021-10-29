import React from 'react'

 export default function Rodape(){
     
 
      return(
            <footer className="rodapePrincipal">
                <section className="rodapePrincipal-patrocinadores">
                <div className="container">
                    <p>Escola SENAI de Informática - {new Date().getFullYear()}</p>
                </div>
                </section>
            </footer>
      )
}

