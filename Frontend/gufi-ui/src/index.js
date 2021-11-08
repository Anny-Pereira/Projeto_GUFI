import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect ,Switch } from 'react-router-dom';



import './index.css';

import App from './Pages/Home/App';
import TiposEventos from './Pages/tiposEventos/TiposEventos'
import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/login/login'
import Eventos from './Pages/eventos/eventos';
import TiposUsuarios from './Pages/tiposUsuarios/tiposUsuarios';
import Perfil from './Pages/perfil/perfil';

import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const routing = (
    //Container de rotas - Lógica pra construir rotas
  <Router>
    <div>
    <Switch> {/*Criado para trocar o componente q irá aparecer*/}
        <Route exact path="/" component={App} /> {/* Home */}
        <PermissaoAdm path="/tiposEventos" component={TiposEventos} /> {/* Tipos Eventos */}
        <Route path="/notFound" component={NotFound} /> {/* Not Found */}
        <Route path="/login" component={Login} /> {/* Login */}
        <Redirect to="/notFound" /> {/* Redireciona para Not Found caso não encontre nenhuma rota */}
        <Route path="/eventos" component={Eventos} /> {/* Redireciona para Eventos */}
        <Route path="/tipoUsuarios" component={TiposUsuarios} /> {/* Redireciona para TiposUsuarios */}
        <Route path="/perfil" component={Perfil} /> {/* Redireciona para Perfil */}
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
