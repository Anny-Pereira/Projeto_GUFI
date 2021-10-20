import {Component} from "react"


class TipoEventos extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            listaTiposEventos : [ {idTipoEvento: 1, titulo: 'C#'}, {idTipoEvento: 2, titulo: 'ReactJS'}],
            titulo: ''
        }
    }

  componentDidMount()
  {
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
                                                <td>{tipoEvento.titulo}</td>
                                            </tr>
                                        )
                                    })
                            }
                          </tbody>  
                      </table>
                  </section>
              </main>
          </div>
      )
  }
}


export default TipoEventos;