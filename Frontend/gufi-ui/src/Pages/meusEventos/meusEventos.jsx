import axios from "axios";
import{ useState, useEffect} from "react";

export default function MeusEventos(){

    const [listaMeusEventos, setListaMuesEventos] = useState([]);

    function buscaMeuseventos(){
        axios('http://localhost:5000/api/presencas/minhas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                setListaMuesEventos(resposta.data)
            };
        })
        .catch(erro => console.log(erro));
    }

    useEffect(buscaMeuseventos, []);

    return(
        <div>
            <main>
                <section>
                    <h2>Meus Eventos</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome do Evento</th>
                                <th>Descrição</th>
                                <th>Data do Evento</th>
                                <th>Acesso</th>
                                <th>Situação</th>
                                <th>Tipo de Evento</th>
                                <th>Localização</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                //
                                listaMeusEventos.map((minhaPresenca)=>{
                                    return(
                                        <th key={minhaPresenca.idPresenca}>
                                            <td>{minhaPresenca.idEventoNavigation.nomeEvento}</td>
                                            <td>{minhaPresenca.idEventoNavigation.descricao}</td>
                                            <td>{Intl.DateTimeFormat("pt-BR", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }).format(new Date(minhaPresenca.idEventoNavigation.dataEvento))}</td>
                                            <td>{minhaPresenca.idEventoNavigation.acessoLivre ? 'Livre' : 'Restrito'}</td>
                                            <td>{minhaPresenca.idSituacaoNavigation.descricao}</td>
                                            <td>{minhaPresenca.idEventoNavigation.idTipoEventoNavigation.tituloTipoEvento}</td>
                                            <td>{minhaPresenca.idIntituicaoNavigation.endereco}</td>
                                        </th>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    )

};