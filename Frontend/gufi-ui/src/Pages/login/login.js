import { Component } from 'ract';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state - {
            email: '',
            senha: '',
            errorMessage: '',
            isLoading: false
        };
    };


    //Função faz chamada para api para realizar login
    efetuaLogin = (event) => {
        //Ignora o comportamento padrão do navegador (recarregar página, por exemplo)
        event.preventDefalt();

        this.setState({ errorMessage: '', isLoading: true});

        //Tudo oq coloca depois da vírgula é o corpo da requisição
        axios.post('http://localhost:5000/api/Login', {
            email: this.state.email,
            senha: this.state.senha
        })

            //Recebe todo o conteudo da resposta da requisição na variável resposta
            .then(resposta => {
                //verifica se o statusCode dessa resposta é igual a 200
                if (resposta.status === 200) {
                    //Se sim, exibe no console do navegador o token do usuario logado
                    console.log('Meu token é ' + resposta.data.token);
                    //Salva o valor do token no localStorage
                    localStorage.setItem('usuario-token', resposta.data.token);
                    //E define que a requisição terminou
                    this.setState({ isLoading: false })
                }
            })


        //Caso haja algum erro
        .catch (() => {
            //Define o valor do state ErrorMessage com uma mensagem personalizada
            this.setState({ errorMessage: "E-mail e/ou senha inválidos!" , isLoading: false})
        })
    }


    atualizaStateCampo = (campo) => {
        //Quando estiver digitando no campo email, por exemplo:
        //email:            adm@adm
        this.setState({ [campo.target.name]: campo.target.value })
    }


    render() {
        return (
            <div>
                <main>
                    <section>
                        <p>Bem vindo(a)! <br />Faça login para acessar a sua conta.</p>

                        {/*Faz a chamada para a função de login quando o botão é pressionado */}

                        <form onSubmit={this.state.efetuaLogin}>

                            {/*name do input === name do state*/}
                            {/* value : define que o input email recebe o valor do state email */}
                            <input type="text" name="email" value={this.state.email} onChange={this.atualizaStateCampo} placeholder="Username" />
                            <input type="text" name="senha" value={this.state.senha} onChange={this.atualizaStateCampo} placeholder="Password" />

                            {/* Exibe a mensagem de erro ao tentar logar com credenciais inválidas  */}
                            <p style={{ color: 'red' }}>{this.state.errorMessage}</p>

                            {/* Verifica se a requisição esta em andamento e se estiver, desabilita o click do botão */}

                            {
                                //Caso seja true, renderiza o botão desabilitado com o texto 'Loading...'
                                this.state.isLoading === true &&
                                <button type="submit" disabled >Loading...</button>

                            }

                            {
                                //Caso seja false, renderiza o botão habilitado com o texto 'Login'
                                <button type="submit" disabled={this.state.email === '' || this.state.senha === ''? 'none' : ''} >Login</button>
                            }

                        </form>
                    </section>
                </main>
            </div>
        )
    }



};