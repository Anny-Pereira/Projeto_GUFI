import { Component } from 'react';
import axios from 'axios';


export default class EventosAdm extends Component {
    constructor(props) {
        super(props);
        this.state = {

            //nome: valor inicial
            titulo: '',
            descricao: '',
            dataEvento: new Date(), //inicialmente vai ser do tipo date, inicia co a data e hora atual (mas pode sofrer alterações)
            acessoLivre: 1, // navegador não entende booleano, mas C# identifica automaticamente
            idTipoEvento: 0,
            idInstituicao: 0,
            listaEventos: [],
            listaTiposEventos: [],
            listaInstituicao: [],

            isLoading: false
        };
    }


    //Função responsável por fazer a requisição e trazer a lista de tipos eventos
    buscaTiposeventos = () => {

        //Assim como o fetch o método Get já vem por padrão 
        axios('http://localhost:5000/api/tiposeventos',{
            headers: {

                //comunicação JWT, o padrão da api + token
                Authorization: 'Bearer' + localStorage.getItem('usuario-login')
            }
        })

        .then(resposta => {

            //caso a requisição retorne um statusCode 200 
            if (resposta.status === 200) {
                //Atualiza o status listaTipoEventos com os dados obtidos da api
                this.setState({listaTiposEventos: resposta.data})
                console.log(this.state.listaTiposEventos)
            }
        })

        //caso ocorra algum erro, mostra no console do navegador
        .catch(erro => console.log(erro));

    }


    //Função responsável por fazer a requisição e trazer a lista de instituições
    buscaInstituicoes = () =>{

        axios('http://localhost:5000/api/instituicoes', {
            headers: {
                Authorization: 'Bearer' + localStorage.getItem('usuario-login')
            }
        })

        .then((resposta) => {
            if (resposta.status === 200) {
                this.setState({listaInstituicao: resposta.data});
                console.log(this.state. listaInstituicao);
            }
        })

        .catch((erro) => console.log(erro));
    }



    //Função responsável por fazer a requisição e trazer a lista de eventos
    buscaEventos = () =>{

        axios('http://localhost:5000/api/eventos').then((resposta) => {
            if (resposta.status === 200) {
                this.setState({listaEventos: resposta.data})
                console.log(this.state.listaEventos)
            }
        })


         //caso ocorra algum erro, mostra no console do navegador
        .catch(erro => console.log(erro));
    }

    atualizaStateCampo = (campo) => {
        // quando estiver digitando no campo username
        //                     email        :       adm@adm.com
    
        this.setState({ [campo.target.name]: campo.target.value });
      };


    componentDidMount(){
        console.log('Inicia ciclo de vida')
        this.buscaTiposeventos();
        this.buscaInstituicoes();
        this.buscaEventos();
    }


    //Função faz chamada para API para cadastrar um evento
    cadastraEvento =(event) => {
        //Ignora comportamento padrão do navegador
        event.preventDefault()
        //Define que a requisição está em andamento
        this.setState({isLoading: true})


        let evento = {
            nomeEvento: this.state.titulo,
            descricao: this.state.descricao,
            dataEvento: new Date(this.state.dataEvento),
            acessoLivre: parseInt(this.state.acessoLivre),
            idTipoEvento: this.state.idTipoEvento,
            idInstituicao: this.state.idInstituicao
        }

        axios.post('http://localhost:5000/api/eventos', evento, {
            headers: {
                Authorization: 'Bearer' + localStorage.getItem('usuario-login')
            } 
        })

        .then( resposta => {
            if (resposta.status === 201) {
                console.log('Evento cadastrado!')
                this.setState({isLoading: false})
            }
        }).catch(erro => {
            console.log(erro);
            this.setState({isLoading: false})
        } )
        
        .then(this.buscaEventos);
    }


    render() {
        return (
          <>
            <main>
              <section>
                {/* Lista de Eventos */}
                <h2>Lista de Eventos</h2>
                <table style={{ borderCollapse: 'separate', borderSpacing: 30 }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Evento</th>
                      <th>Descrição</th>
                      <th>Data</th>
                      <th>Acesso Livre</th>
                      <th>Tipo de Evento</th>
                      <th>Localização</th>
                    </tr>
                  </thead>
    
                  <tbody>
                    {/* Preenche o corpo da tabela utilizando a funcao map(). */}
    
                    {/* <tr><td>teste de linha</td></tr>  */}
                    {this.state.listaEventos.map((evento) => {
                      return (
                        <tr key={evento.idEvento}>
                          <td>{evento.idEvento}</td>
                          <td>{evento.nomeEvento}</td>
                          <td>{evento.descricao}</td>
                          <td>{evento.dataEvento}</td>
                          <td>{evento.acessoLivre ? 'Livre' : 'Restrito'}</td>
                          <td>{evento.idTipoEventoNavigation.tituloTipoEvento}</td>
                          <td>{evento.idInstituicaoNavigation.endereco}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
    
              <section>
                {/* Cadastro de Eventos */}
                <h2>Cadastro de Eventos</h2>
                <form onSubmit={this.cadastrarEvento}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '20vw',
                    }}
                  >
                    <input
                      required
                      type="text"
                      name="titulo"
                      value={this.state.titulo}
                      onChange={this.atualizaStateCampo}
                      placeholder="Titulo do Evento"
                    />
    
                    <input
                      required
                      type="text"
                      name="descricao"
                      value={this.state.descricao}
                      onChange={this.atualizaStateCampo}
                      placeholder="Descrição do Evento"
                    />
    
                    <input
                      type="date"
                      name="dataEvento"
                      value={this.state.dataEvento}
                      onChange={this.atualizaStateCampo}
                    />
    
                    <select
                      name="idTipoEvento"
                      value={this.state.idTipoEvento}
                      onChange={this.atualizaStateCampo}
                    >
                      <option value="0" selected disabled>
                        Selecione o tema do evento
                      </option>
    
                      {/* utilizar a funcao map() */}
    
                      {this.state.listaTiposEventos.map((tema) => {
                        return (
                          <option key={tema.idTipoEvento} value={tema.idTipoEvento}>
                            {tema.tituloTipoEvento}
                          </option>
                        );
                      })}
                    </select>
    
                    <select
                      name="idInstituicao"
                      value={this.state.idInstituicao}
                      onChange={this.atualizaStateCampo}
                    >
                      <option value="0" selected disabled>
                        Selecione a instituição
                      </option>
    
                      {/* utilizar a funcao map() */}
    
                      {this.state.listaInstituicao.map((tema) => {
                        return (
                          <option
                            key={tema.idInstituicao}
                            value={tema.idInstituicao}
                          >
                            {tema.nomeFantasia}
                          </option>
                        );
                      })}
                    </select>
    
                    <select
                      name="acessoLivre"
                      value={this.state.acessoLivre}
                      onChange={this.atualizaStateCampo}
                    >
                      <option value="">Selecione o acesso</option>
                      <option value="1">Livre</option>
                      <option value="0">Restrito</option>
                    </select>
    
                    {this.state.isLoading === true && (
                      <button type="submit">Loading...</button>
                    )}
    
                    {this.state.isLoading === false && (
                      <button type="submit">Cadastrar</button>
                    )}
                  </div>
                </form>
              </section>
            </main>
          </>
        );
      }

 }
