import {Component} from "react"


class TipoEventos extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            listaTiposEventos : [],
            titulo: ''
        }
    }


    buscarTipoEventos = () =>{
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
        .then(dados => this.setState({listaTiposEventos: dados}))

        //Caso ocorra algum erro, mostra no console do navegador
        .catch(erro => console.log(erro))
    }


    //OnChange vai disparar por tecla e invocar essa função
    atualizaEstadoTitulo = async (event) =>{

        //console.log("Adicionou essa função");

        await this.state({

            //Dizendo que o target(alvo do evento), vamos pegar o value(valor)
            titulo: event.target.value

        })
        console.log(this.state.titulo);
    }


    cadastrarTipoEvento = (event)=>{
        event.preventDefault();

        fetch('http://localhost:5000/api/TiposEventos', 
        {method: "post", 

        //body: {tituloTipoEvento = this.state.titulo} //objeto

        //Converte o state p/ uma string json
        body: JSON.stringify({tituloTipoEvento : this.state.titulo}),

        headers: {
            "Context-type": "application/json"
        }
    })

    .then(console.log("Tipo de evento cadastrado!"))

    .catch(erro => console.log(erro))

    .then(this.buscarTipoEventos)

    }


    //Representa o ciclo de vida do componente - Nascimento
  componentDidMount()
  {

    this.buscarTipoEventos() //Função não existe, mas será criada em breve

      //
  }


  render(){
      return(
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
                            </tr>
                          </thead>
                          <tbody>
                            {
                                this.state.listaTiposEventos.map(
                                    (tipoEvento) => {
                                        return(
                                            <tr key={tipoEvento.idTipoEvento}>  {/*chave com identificador unico*/}
                                                <td>{tipoEvento.idTipoEvento}</td>
                                                <td>{tipoEvento.tituloTipoEvento}</td>
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
                              <input type="text" value= {this.state.titulo}
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