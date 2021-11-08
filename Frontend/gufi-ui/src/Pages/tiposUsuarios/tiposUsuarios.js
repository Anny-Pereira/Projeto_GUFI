import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function TiposUsuarios(){
    //Não precisa de constructor  nem função render() em componentes funcionais


    //ESTRUTRA DO STATE criado através do Hooks UseState:
    //const [nomeSTate, funcaoAtualiza] = useStte(valorInicial);

    //Toda vez que eu chamo a funcao atualiza determinado state 
    //Define o State listaTipoUsuarios, a função setListaTiposUsuarios que vai atualizar o state
    //Define que o valor inicial deste state é um array  vazio
    const[listaTipoUsuarios, setListaTiposUsuarios] = useState([]);


    const[titulo, setTitulo] = useState('');

    const[isLoading, setIsLoading] = useState(false);


    //Função responsável por fazer a requisição e trazer a lista de tipos usuarios
    function buscarTiposUsuarios(){
        //Faz a chamada apara a API usando axios
        axios('http://localhost:5000/api/tiposusuarios', {
            headers:{
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {
            //Caso a resposta da requisição tenha um status code igual a 200 
            if (resposta.status === 200) {
                //Atualiza o state tListaTiposUsuarios com os dados do corpo da resposta
                setListaTiposUsuarios(resposta.data); 
            }
        })

        //Caso ocorra algum erro, mostra no console do navegador
        .catch(erro => console.log(erro));
    };


    //ESTRUTURA HOOK UseEffect
    //useEffect(efeito, causa)
    //useEffect({o que vai ser feito}, {o que será escutado})
    useEffect(buscarTiposUsuarios, []);


    //Função responsável por fazer a requisição que cadastra um novo tipo de usuario
    function cadastrarTipoUsuario(evento){
        evento.preventDefault();

        //Define que uma requisição está em andamento
        setIsLoading(true);

        axios.post('http://localhost:5000/api/tiposusuarios',{
            tituloTipoUsuario: titulo
        },
        {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        } )

        .then(resposta=> {
            //Se o status code da respostada requisição foi igual a 201
            if (resposta.status === 201) {
                //Exibe a mensagem no console do navegador
                console.log('Tipo de Usuário cadastrado!')
                //Atualiza a ListaTipoUsuarios automaticamente
                buscarTiposUsuarios();
                //Para limpar o campo / Reseta o valor do state titulo
                setTitulo('');
                setIsLoading(false);
            }
        })
        //Caso ocorra algum erro, mostra no console do navegador
        .cath(erro => console.log(erro), 
            setInterval(()=> {
                setIsLoading(false)
            }, 3000)
        );
    }


    return(
        <div>
            <main>
                {/* Sessão de Listagem */}
                <section>
                    <h2>Tipos de Usuários</h2>
                    <div>
                        <table style={{borderCollapse: 'separate', borderSpacing: 30}}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Título</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listaTipoUsuarios.map((tipoUsuario) => {
                                        return(
                                            <tr key={tipoUsuario.idTipoUsuario}>
                                                <td>{tipoUsuario.idTipoUsuario}</td>
                                                <td>{tipoUsuario.tituloTipoUsuario}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Sessão de Cadastro */}
                <section>
                    <h2>Cadastro de Tipo de Usuário</h2>
                    <form onSubmit={cadastrarTipoUsuario}>
                        <div>
                            <input type="text" placeholder="Título do Tipo de Usuário" value={titulo} onChange={(campo) => setTitulo(campo.target.value)} />
                            {
                                isLoading === false &&
                                <button type="submit">Cadastrar</button> 
                            }
                            {
                                isLoading === true &&
                                <button type="submit" disabled>Carregando...</button>
                            }
                            {/* <button type="submit">Cadastrar</button> */}

                             {/* {
                                outra forma - if ternário

                                isLoading === false ? (
                                    <button type="submit">Cadastrar</button>
                                 ) : ( 
                                    <button type="submit" disabled>Carregando...</button>
                                 )
                            } */}

                        </div>
                    </form>
                </section>
            </main>
        </div>
    )
}