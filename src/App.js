import React, { Component } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import Login from './admin/Login'
import Admin from './admin/Admin'
import CalendarioProvasMobile from './calendarioProvas/CalendarioProvasMobile'
import ProfessorMobile from '../src/professor/ProfessorMobile'
import HorarioPeMobile from '../src/horarioPe/HorarioPeMobile'

class App extends Component {
  render() {

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path='/' component={Login} />
            <Route path='/admin' component={Admin} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
