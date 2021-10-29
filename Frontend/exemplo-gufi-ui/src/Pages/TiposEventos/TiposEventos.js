import { Component } from "react"


class TipoEventos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaTiposEventos: [],
            titulo: '',
            idTipoEventoAlterado: 0
        }
    };


    buscarTipoEventos = () => {
        console.log("Agora vamos fazer a chamada para a API.");


        //função nativa JS, ela é uma api com métodos

        //Dentro dos parenteses, informa qual é o endpoint
        fetch('http://localhost:5000/api/TiposEventos')
            //Por padrão sempre começa com GET


            //Promess - consulta a url/ a requisição passada e "promete" devolver algo 
            //Quando tiver retorno, cvai trazer resposta em json
            //Define o tipo de dados de retorno da requisicao como json
            .then(resposta => resposta.json())

            //.then(resposta => console.log(resposta))


            //.then(dados => console.log(dados.json()))

            //Atualizar o state listaTipoEvento com os dados obtidos em formato json
            .then(dados => this.setState({ listaTiposEventos: dados }))

            //Caso ocorra algum erro, mostra no console do navegador
            .catch(erro => console.log(erro))
    }


    //OnChange vai disparar por tecla e invocar essa função
    atualizaEstadoTitulo = async (event) => {

        //console.log("Adicionou essa função");

        await this.state({

            //Dizendo que o target(alvo do evento), vamos pegar o value(valor)
            titulo: event.target.value

        })
        console.log(this.state.titulo);
    };


    cadastrarTipoEvento = (event) => {
        event.preventDefault();

        console.log(JSON.stringify({ tituloTipoEvento: this.state.titulo }))


        //Caso algum tipo de evento seja selecionado para edição,
        if (this.state.idTipoEventoAlterado !== 0) {

            //Faz chamada para api usando fetch e passando o ID  do tipo de evento que será atualizado na URL da requisição
            fetch('http://localhost:5000/api/tiposeventos/' + this.state.idTipoEventoAlterado, {

                //Define o método da requisiçã(PUT)
                method="PUT",

                //Deine o corpo da requisição especificando o tipo(JSON)
                //Ultima versao do valor (o que o usuário digitar)
                body: JSON.stringify({ tituloTipoEvento: this.state.titulo }),

                //Define o cabeçalho da requisição
                headers: {
                    "Content-Type": "application/json"
                }
            })

                .then(resposta => {
                    //caso a requisição retorne um StatusCode 204
                    if (resposta.status === 204) {
                        console.log(
                            //Exibe no console do navegador a mensagem abaixo
                            'O tipo de evento ' + this.state.idTipoEventoAlterado + 'foi atualizado!',

                            //e finforma qual é seu novo título
                            'Seu novo título agora é: ' + this.state.titulo
                        );
                    };
                })

                //Caso ocorra algum erro, mostra no console do navegador
                .catch(erro => console.log(erro))

                //Atualiza a lista tipos de eventos sem o usuário precisar executar outra ação
                .then(this.buscarTipoEventos)

                .then(this.limparCampos);
        }

        else {


            fetch('http://localhost:5000/api/TiposEventos',
                {
                    method: "post",

                    //body: {tituloTipoEvento = this.state.titulo} //objeto

                    //Converte o state p/ uma string json
                    body: JSON.stringify({ tituloTipoEvento: this.state.titulo }),

                    headers: {
                        "Context-type": "application/json"
                    }
                })


                //Exibe no console a msg "Tipo de evento cadastrado"
                .then(console.log("Tipo de evento cadastrado!"))


                //caso ocorra algum erro, mostra no console do navegador.
                .catch(erro => console.log(erro))

                .then(this.buscarTipoEventos)

                .then(this.limparCampos);

        }


    }






    //Recebe um tipo de evento da lista
    buscarTipoEventoPorId = (tipoEvento) => {
        this.setState({
            //Atualiza o state idTipoEventoAlterado com o valor do ID do TipoEvento recebido
            idTipoEventoAlterado: tipoEvento.idTipoEvento,
            //Atualiza o state titulo com o valor do titulo do tipo de evento recebido
            titulo: tipoEvento.tituloTipoEvento
        },

            () => {
                console.log(
                    'O tipo de evento ' + tipoEvento.idTipoEvento + ' foi selecionado',
                    'Agora o valor do state idTipoEventoAlterado é: ' + this.state.idTipoEventoAlterado,
                    'E o valor do state título é: ' + this.state.titulo
                )
            }

        );


    };



    //Função responsável por excluir um tipo evento
    excluirTipoEvento = (tipoEvento) => {
        console.log('O Tipo de Evento ' + tipoEvento.idTipoEvento + 'foi selecionado!')

        fetch('http://localhost:5000/api/TiposEventos/' + tipoEvento.idTipoEvento, {
            method: 'DELETE'
        })

            .then(resposta => {
                if (resposta.status === 204) {
                    console.log('Tipo de Evento ' + tipoEvento.idTipoEvento + 'foi excluído!')
                };
            })

            //CAso ocorra algum erro, mostra no console do navegador
            .catch(erro => console.log(erro))

            .then(this.buscarTipoEventos);

    }


    limparCampos = () => {
        this.setState({
            titulo: '',
            idTipoEventoAlterado: 0
        })
        console.log('Os states foram resetados!')
    };


    //Representa o ciclo de vida do componente - Nascimento
    componentDidMount() {

        this.buscarTipoEventos() 

        //
    }


    render() {
        return (
            <div>
                <main>
                    {/* Lista de tipos de eventos*/}
                    <section>
                        <h2>Lista de Tipos de Eventos</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Título</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.listaTiposEventos.map(
                                        (tipoEvento) => {
                                            return (
                                                <tr key={tipoEvento.idTipoEvento}>  {/*chave com identificador unico*/}
                                                    <td>{tipoEvento.idTipoEvento}</td>
                                                    <td>{tipoEvento.tituloTipoEvento}</td>

                                                    {/*<td><button type="submit" >Editar</button></td>*/}

                                                    {/*Altera  o texto do botão de acordo com a aparição (edição ou cadastro) 
                                                usando if ternário

                                                ESTRUTURA - IF TERNÁRIO
                                                Condição ? acontece algo caso verdadeiro : acontece algo caso falso

                                                */}

                                                    {/*
                                                    this.state.idTipoEventoAlterado === 0 ?
                                                    <td><button type="submit" >Editar</button></td> :
                                                    <td><button type="submit" >Atualizar</button></td>
                                                */}

                                                    {/*Outra forma, com if ternário e disbled ao mesmo tempo: */}

                                                    {
                                                        //'nome' = botao desabilitado (pode ser clicado)
                                                        //'' = botao ativado (não pode ser clicado)
                                                        <button type="submit" disabled={this.state.titulo === '' ? 'nome' : ''}>
                                                            {this.state.idTipoEventoAlterado === 0 ? 'Cadastrar' : 'Atualizar'}
                                                        </button>
                                                    }

                                                    {/*Faz a chamada da funçao limparCampos*/}

                                                    <button type="button" onClick={this.limparCampos}>Cancelar</button>


                                                    {/* Caso algum tipo de evento tenha sido selecionado para edição, exibe uma mensagem de feedback ao usuario*/}

                                                    {
                                                        //&& - quando a condição é apenas verdadeira
                                                        this.state.idTipoEventoAlterado !== 0 &&
                                                        <div>
                                                            <p>O tipo de evento {this.state.idTipoEventoAlterado} está sendo editado.</p>
                                                            <p>Clique em Cancelar caso queira cancelar a operação antes de cadastrar um novo tipo de evento.</p>
                                                        </div>
                                                    }


                                                    <td><button onClick={() => this.excluirTipoEvento(tipoEvento)}>Excluir</button></td>

                                                </tr>
                                            )
                                        })
                                }
                            </tbody>
                        </table>
                    </section>

                    <section>
                        {/* Cadastro por tipo de evento*/}
                        <h2>Cadastro de Tipo de Evento</h2>
                        <form onSubmit={this.cadastrarTipoEvento}>
                            <div>
                                {/* Valor do state é o input*/}
                                <input type="text" value={this.state.titulo}
                                    placeholder="Título do Tipo de Evento"


                                    //Cada vez que tiver uma mudança, (por tecla)
                                    //Cada vez que tiver uma nova tecla, atualiza o state do titulo
                                    onChange={this.atualizaEstadoTitulo}

                                />
                                <button type="submit">Cadastrar</button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        )
    }
}


export default TipoEventos;