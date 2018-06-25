import React, { Component } from 'react'
import { auth } from '../base'
import { Redirect, Route } from 'react-router-dom'


import HorarioPe from '../horarioPe/HorarioPE'
import Professor from '../professor/Professor'
import CalendarioProvas from '../calendarioProvas/CalendarioProvas'
import Cursos from '../cursos/Curso'
import HorarioDeAula from '../horarioAula/HorarioDeAula'
import NavBar from '../components/NavBar'

class Admin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthing: true,
      isLoggedIn: false,
      user: null
    }

    this.handleLoggout = this.handleLoggout.bind(this)
  }

  componentDidMount() {
    this.removeAuth = auth.onAuthStateChanged(user => {
      this.setState({
        isAuthing: false,
        isLoggedIn: !!user,
        user: user
      })
    })
  }

  handleLoggout() {
    auth.signOut()
  }

  componentWillUnmount() {
    this.removeAuth()
  }

  render() {

    console.log(this.state.isLoggedIn)

    if (this.state.isAuthing) {
      return <p>Aguarde...</p>
    }
    if (!this.state.isLoggedIn) {
      return <Redirect to='/' />
    }

    return (
      <div className="container">

        <NavBar />
        <div className="row justify-content-end">
          <div className="col-3">
            <h6>{this.state.user.email}</h6>
          </div>
          <div className="col-1">
            <button className="btn btn-xs" onClick={this.handleLoggout}>Sair</button>
          </div>
        </div>

        <Route exact={true} path={`${this.props.match.url}/horario-pe`} component={HorarioPe} />
        <Route exact={true} path={`${this.props.match.url}/professor`} component={Professor} />
        <Route exact={true} path={`${this.props.match.url}/calendario-provas`} component={CalendarioProvas} />
        <Route exact={true} path={`${this.props.match.url}/cursos`} component={Cursos} />
        <Route exact={true} path={`${this.props.match.url}/horario-de-aula`} component={HorarioDeAula} />

      </div >
    )
  }
}

export default Admin