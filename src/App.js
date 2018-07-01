import React, { Component } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
//C:\code\tads\dispMoveis\ifms-app\src\recursos\css\bootstrap.min.css
import './recursos/css/bootstrap.min.css'
import './recursos/css/estilo.css'

import Login from './admin/Login'
import Admin from './admin/Admin'
import Footer from './components/Footer'

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

        <Footer />
      </div>
    )
  }
}

export default App;
