import { Component } from 'react';

export default class Eventos extends Component {
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
    }

 }
