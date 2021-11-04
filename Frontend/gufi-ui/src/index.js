import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect ,Switch } from 'react-router-dom';

import './index.css';

import Home from './pages/home/App';
import TiposEventos from './pages/tiposEventos/TiposEventos.jsx';
import NotFound from './pages/notFound/NotFound';
import Login from './pages/login/login';

import reportWebVitals from './reportWebVitals';

const routing = (
    //Container de rotas - Lógica pra construir rotas
  <Router>
    <div>
    <Switch> {/*Criado para trocar o componente q irá aparecer*/}
        <Route exact path="/" component={Home} /> {/* Home */}
        <Route path="/tiposEventos" component={TiposEventos} /> {/* Tipos Eventos */}
        <Route path="/notFound" component={NotFound} /> {/* Not Found */}
        <Route path="/login" component={Login} /> {/* Login */}
        <Redirect to="/notFound" /> {/* Redireciona para Not Found caso não encontre nenhuma rota */}
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
