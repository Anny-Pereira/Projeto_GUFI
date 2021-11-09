import { React, Component } from 'react';
import axios from 'axios';
import Header from '../../components/header/header';
import Rodape from '../../components/rodape/rodape';


import logo from '../../assets/img/logo.png';
import Titulo from '../../components/titulo/titulo';

export default class Perfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arquivo: '',
            base64img: ''
        }
    }


    enviarArquivo = () => {

        console.log('Envio')

        if (this.state.arquivo != '') {

            const formData = new formData();

            //FormData = maneira fácil para construir um conjunto chave/valor, para ser utilizado no método send().
            //FormData.append = acrescenta um novo valor em uma chave existente dentro de um objeto FormData, ou adiciona a chave se ela ainda não existir
            formData.append(
                'arquivo', // chave, nome do arquivo que será enviado
                this.state.arquivo, // valor, arquivo físico
            );

            axios.post('http://localhost:5000/api/perfil/imagem/bd', formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })

                .then(console.log('Upload realizado!'))

                .catch((erro) => console.log(erro))

                .then(this.buscarImg);
        }

        else {
            console.log('Nenhum arquivo selecionado!');
        }

    };


    atualizaState = (event) => {
        console.log(event)
        this.setState({ arquivo: event.target.files[0] })
    }

    buscarImg = () => {
        axios('http://localhost:5000/api/perfil/imagem/bd', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({ base64img: resposta.data })
                }
            })

            .cath((erro) => console.log(erro))
    }

    componentDidMount() {
        this.buscarImg();
    }


    render() {
        return (
            <div>
                <Header />
                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <Titulo titulosecao="Imagem do Perfil" />
                        <div className="container" id="conteudoPrincipal-lista">
                            <input type="file" onChange={this.atualizaState}></input>
                            <button onClick={this.enviarArquivo}>Upload</button>
                        </div>
                        <div>
                            <h2>Upload de Imagem</h2>
                             {/* scr vai carregar no data uma imagem do tipo base64 */}
                             <img alt="Imagem do Perfil" src={`data:image;base64,${this.state.base64img}`}></img>
                        </div>
                    </section>
                </main>
                <Rodape />
            </div>
        )
    }
}


