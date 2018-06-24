import React, { Component } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import HorarioPe from '../src/horarioPe/HorarioPE'
import HorarioPeMobile from '../src/horarioPe/HorarioPeMobile'
import Professor from './professor/Professor'
import ProfessorMobile from '../src/professor/ProfessorMobile'
import TopApp from './components/TopApp'
import CalendarioProvas from './calendarioProvas/CalendarioProvas'
import CalendarioProvasMobile from './calendarioProvas/CalendarioProvasMobile'
import Cursos from './cursos/Curso';
import HorarioDeAula from './horarioAula/HorarioDeAula';

class App extends Component {
  render() {

    return (
      <div className="container">
        <div className="row">

          <TopApp />
          <BrowserRouter>
            <Switch>
              <Route exact={true} path='/horariope' component={HorarioPe} />
              <Route exact={true} path='/m-horariope' component={HorarioPeMobile} />
              <Route exact={true} path='/professor' component={Professor} />
              <Route exact={true} path='/m-professor' component={ProfessorMobile} />
              <Route exact={true} path='/m-professor' component={ProfessorMobile} />
              <Route exact={true} path='/calendarioProvas' component={CalendarioProvas} />
              <Route exact={true} path='/m-calendarioProvas' component={CalendarioProvasMobile} />
              <Route exact={true} path='/cursos' component={Cursos} />
              <Route exact={true} path='/horario-de-aula' component={HorarioDeAula} />
            
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
