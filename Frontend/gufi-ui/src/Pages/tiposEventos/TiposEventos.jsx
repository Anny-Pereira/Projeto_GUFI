import { Component } from "react";
import Header from "../../components/header/header";

import Rodape from "../../components/rodape/rodape";
import Titulo from "../../components/titulo/titulo";

export default class TiposEventos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaTiposEventos: [],
            titulo: '',
            idTipoEventoAlterado: 0,
            titulosecao: 'Lista Tipos Eventos',
            
        }
    };

    buscarTipoEventos = () => {
        console.log('agora vamos fazer a chamada para a api.')

        //funcao nativa JS, ele é uma API com métodos.

        //dentro dos parenteses vamos informar qual é o end point.
        fetch('http://localhost:5000/api/tiposeventos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')},
        })
            //por padrao ele sempre inicia como GET.



            //Promess - consulta a url/ a requisição passada e "promete" devolver algo 
            //Quando tiver retorno, cvai trazer resposta em json
            //Define o tipo de dados de retorno da requisicao como json
            .then(resposta => resposta.json())

            //.then( dados => console.log(dados.json()))


            //.then(dados => console.log(dados.json()))


            // Atualiza o state listaTiposEventos com os dados obtidos em formato json.
            .then(dados => this.setState({ listaTiposEventos: dados }))

            //caso ocorra algum erro, mostra no console do navegador
            .catch(erro => console.log(erro))
    }


    //onChange vai disparar por tecla e invocar essa funcao.
    atualizaEstadoTitulo = async (event) => {
        //console.log('Acionou essa funcao');

        await this.setState({
            //Dizendo que o target (alvo) do evento ,  vamos pegar o value(valor) 
            titulo: event.target.value
        });
        console.log(this.state.titulo);
    };

    manipularTipoEvento = (submit_formulario) => {
        submit_formulario.preventDefault();

        console.log(JSON.stringify({ tituloTipoEvento: this.state.titulo }))

        // Caso algum Tipo de Evento seja selecionado para edição,
        if (this.state.idTipoEventoAlterado !== 0) {

            // faz a chamada para a API usando fetch e passando o ID do Tipo de Evento que será atualizado na URL da requisição
            fetch('http://localhost:5000/api/tiposeventos/' + this.state.idTipoEventoAlterado, {

                // Define o método da requisição ( PUT )
                method: 'PUT',

                // Define o corpo da requisição especificando o tipo ( JSON )
                //Ultima versao do valor (o que o usuário digitar)
                body: JSON.stringify({ tituloTipoEvento: this.state.titulo }),

                // Define o cabeçalho da requisição
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                }
            })

                .then(resposta => {
                    // Caso a requisição retorne um status code 204,
                    if (resposta.status === 204) {
                        console.log(
                            // Exibe no console do navegador a mensagem abaixo
                            'O Tipo de Evento ' + this.state.idTipoEventoAlterado + ' foi atualizado!',
                            // e informa qual é seu novo título
                            'Seu novo título agora é: ' + this.state.titulo
                        );
                    };
                })

                // caso ocorra algum erro, mostra no console do navegador.
                .catch(erro => console.log(erro))

                // Então, atualiza a lista de Tipos de Eventos
                // sem o usuário precisar executar outra ação
                .then(this.buscarTipoEventos)

                .then(this.limparCampos);
        }

        else {

            fetch('http://localhost:5000/api/tiposeventos', {

                method: 'POST',

                //body: {tituloTipoEvento = this.state.titulo} //objeto

                //Converte o state p/ uma string json

                body: JSON.stringify({ tituloTipoEvento: this.state.titulo }), //lembrado que aqui e um obj js e nao json.

                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                }
            })
                //Exibe no console a msg "Tipo de evento cadastrado"
                .then(console.log("Tipo de evento cadastrado."))

                //caso ocorra algum erro, mostra no console do navegador.
                .catch(erro => console.log(erro))

                .then(this.buscarTipoEventos)

                .then(this.limparCampos);
        }
    }

    //Representa o ciclo de vida do componente - Nascimento
    componentDidMount() {
        this.buscarTipoEventos();
    }

    // Recebe um tipo de evento da lista
    buscarTipoEventoPorId = (tipoEvento) => {
        this.setState({
            // Atualiza o state idTipoEventoAlterado com o valor do ID do Tipo de Evento recebido
            idTipoEventoAlterado: tipoEvento.idTipoEvento,
            //Atualiza o state titulo com o valor do titulo do tipo de evento recebido
            titulo: tipoEvento.tituloTipoEvento
        }, () => {
            console.log(
                'O Tipo de Evento ' + tipoEvento.idTipoEvento + ' foi selecionado,',
                'agora o valor do state idTipoEventoAlterado é: ' + this.state.idTipoEventoAlterado,
                'e o valor do state título é: ' + this.state.titulo
            );
        });
    };

    // Função responsável por excluir um Tipo de Evento
    excluirTipoEvento = (tipoEvento) => {
        console.log('O Tipo de Evento ' + tipoEvento.idTipoEvento + ' foi selecionado!');

        fetch('http://localhost:5000/api/TiposEventos/' + tipoEvento.idTipoEvento,
        {
            method: 'DELETE',
            headers: {
            Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
              },
        })

        .then(resposta => {
            if (resposta.status === 204) {
                console.log('Tipo de Evento ' + tipoEvento.idTipoEvento + ' foi excluído!')
            };
        })

        //caso ocorra algum erro, mostra no console do navegador.
        .catch(erro => console.log(erro))

        .then(this.buscarTipoEventos);
    };

    limparCampos = () => {
        this.setState({
            titulo : '',
            idTipoEventoAlterado : 0
        })
        console.log('Os states foram resetados!')
    };

    render() {
        return (
            <div>
                <Header />
                <main className="conteudoPrincipal">
                    {/* Lista de Tipos de Eventos */}
                    <section className="conteudoPrincipal-cadastro">
                        
                        <Titulo titulosecao={this.state.titulosecao} />

                        {/* <h2 class="conteudoPrincipal-cadastro-titulo">Lista de Tipos de Eventos</h2> */}
                        
                        <div class="container" id="conteudoPrincipal-lista">          
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="tabela-lista-corpo">
                                    {
                                        this.state.listaTiposEventos.map((tipoEvento) => {
                                            //console.log(tipoEvento)
                                            return (
                                                <tr key={tipoEvento.idTipoEvento}>
                                                    <td>{tipoEvento.idTipoEvento}</td>
                                                    <td>{tipoEvento.tituloTipoEvento}</td>

                                                    <td><button onClick={() => this.buscarTipoEventoPorId(tipoEvento)} >Editar</button>
                                                    <button onClick={() => this.excluirTipoEvento(tipoEvento)} >Excluir</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Cadastro por tipo de evento */}
                    <section className="container" id="conteudoPrincipal-cadastro">
                    <Titulo titulosecao="Cadastro de Tipo de Evento" />

                        {/* <h2 className="conteudoPrincipal-cadastro-titulo">Cadastro de tipo de evento</h2> */}
                        <form onSubmit={this.manipularTipoEvento} >
                            <div className="container">
                                {/* valor do state é o input */}
                                <input
                                    type="text"
                                    value={this.state.titulo}
                                    placeholder="Título do Tipo de Evento"
                                    //cada vez que tiver uma mudanca, (por tecla)
                                    onChange={this.atualizaEstadoTitulo}
                                />

                                {/* <button type="submit" >Cadastrar</button> */}

                                {/* Altera o texto do botão de acordo com a operação ( edição ou cadastro ) usando if ternário */}

                                {/* Estrutura de um IF Ternário
                                    CONDIÇÃO ? ACONTECE ALGO CASO VERDADE : ACONTECE ALGO CASO FALSO
                                */}

                                {/* {
                                    this.state.idTipoEventoAlterado === 0 ?
                                    <button type="submit">Cadastrar</button> :
                                    <button type="submit">Atualizar</button>
                                } */}

                                {/* Uma outra forma, com IF Ternário e disabled ao mesmo tempo */}

                                {
                                    <button type="submit"  class="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro" disabled={ this.state.titulo === '' ? 'none' : '' }>
                                        { this.state.idTipoEventoAlterado === 0 ? 'Cadastrar' : 'Atualizar' }
                                    </button>
                                }

                                {/* Faz a chamada da função limparCampos */}

                                <button type="button"  class="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro" onClick={this.limparCampos} style={{ display : '' }}>
                                    Cancelar
                                </button>

                                {/* 
                                    Caso algum Tipo de Evento tenha sido selecionado para edição,
                                    exibe uma mensagem de feedback ao usuário
                                */}

                                {
                                    this.state.idTipoEventoAlterado !== 0 &&
                                    <div>
                                        <p>O tipo de evento {this.state.idTipoEventoAlterado} está sendo editado.</p>
                                        <p>Clique em Cancelar caso queira cancelar a operação antes de cadastrar um novo tipo de evento.</p>
                                    </div>
                                }

                            </div>
                        </form>
                    </section>
                </main>
                <Rodape />

            </div>
        )
    }

    //MEU RENDER
    // render() {
    //     return (
    //         <div>
    //             <main>
    //                 {/* Lista de tipos de eventos*/}
    //                 <section>
    //                     <h2>Lista de Tipos de Eventos</h2>
    //                     <table>
    //                         <thead>
    //                             <tr>
    //                                 <th>Id</th>
    //                                 <th>Título</th>
    //                                 <th>Ações</th>
    //                             </tr>
    //                         </thead>
    //                         <tbody>
    //                             {
    //                                 this.state.listaTiposEventos.map(
    //                                     (tipoEvento) => {
    //                                         return (
    //                                             <tr key={tipoEvento.idTipoEvento}>  {/*chave com identificador unico*/}
    //                                                 <td>{tipoEvento.idTipoEvento}</td>
    //                                                 <td>{tipoEvento.tituloTipoEvento}</td>

    //                                                 {/*<td><button type="submit" >Editar</button></td>*/}

    //                                                 {/*Altera  o texto do botão de acordo com a aparição (edição ou cadastro) 
    //                                             usando if ternário

    //                                             ESTRUTURA - IF TERNÁRIO
    //                                             Condição ? acontece algo caso verdadeiro : acontece algo caso falso

    //                                             */}

    //                                                 {/*
    //                                                 this.state.idTipoEventoAlterado === 0 ?
    //                                                 <td><button type="submit" >Editar</button></td> :
    //                                                 <td><button type="submit" >Atualizar</button></td>
    //                                             */}

    //                                                 {/*Outra forma, com if ternário e disbled ao mesmo tempo: */}

    //                                                 {
    //                                                     //'nome' = botao desabilitado (pode ser clicado)
    //                                                     //'' = botao ativado (não pode ser clicado)
    //                                                     <button type="submit" disabled={this.state.titulo === '' ? 'nome' : ''}>
    //                                                         {this.state.idTipoEventoAlterado === 0 ? 'Cadastrar' : 'Atualizar'}
    //                                                     </button>
    //                                                 }

    //                                                 {/*Faz a chamada da funçao limparCampos*/}

    //                                                 <button type="button" onClick={this.limparCampos}>Cancelar</button>


    //                                                 {/* Caso algum tipo de evento tenha sido selecionado para edição, exibe uma mensagem de feedback ao usuario*/}

    //                                                 {
    //                                                     //&& - quando a condição é apenas verdadeira
    //                                                     this.state.idTipoEventoAlterado !== 0 &&
    //                                                     <div>
    //                                                         <p>O tipo de evento {this.state.idTipoEventoAlterado} está sendo editado.</p>
    //                                                         <p>Clique em Cancelar caso queira cancelar a operação antes de cadastrar um novo tipo de evento.</p>
    //                                                     </div>
    //                                                 }


    //                                                 <td><button onClick={() => this.excluirTipoEvento(tipoEvento)}>Excluir</button></td>

    //                                             </tr>
    //                                         )
    //                                     })
    //                             }
    //                         </tbody>
    //                     </table>
    //                 </section>

    //                 <section>
    //                     {/* Cadastro por tipo de evento*/}
    //                     <h2>Cadastro de Tipo de Evento</h2>
    //                     <form onSubmit={this.cadastrarTipoEvento}>
    //                         <div>
    //                             {/* Valor do state é o input*/}
    //                             <input type="text" value={this.state.titulo}
    //                                 placeholder="Título do Tipo de Evento"


    //                                 //Cada vez que tiver uma mudança, (por tecla)
    //                                 //Cada vez que tiver uma nova tecla, atualiza o state do titulo
    //                                 onChange={this.atualizaEstadoTitulo}

    //                             />
    //                             <button type="submit">Cadastrar</button>
    //                         </div>
    //                     </form>
    //                 </section>
    //             </main>
    //         </div>
    //     )
    // }
};