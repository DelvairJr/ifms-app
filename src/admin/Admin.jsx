import React, { Component } from 'react'
import { auth } from '../base'
import { Redirect, Route } from 'react-router-dom'


import HorarioPe from '../horarioPe/HorarioPE'
import HorarioPeMobile from '../horarioPe/HorarioPeMobile'
import Professor from '../professor/Professor'
import ProfessorMob from '../professor/ProfessorMobile'
import CalendarioProvas from '../calendarioProvas/CalendarioProvas'
import CalendarioProvasMob from '../calendarioProvas/CalendarioProvasMobile'
import Cursos from '../cursos/Curso'
import HorarioDeAula from '../horarioAula/HorarioDeAula'
import NavBar from '../components/NavBar'

export default class Admin extends Component {
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
      <div>

        <NavBar />

        <div className="container">
          <div className="row" id="user">
            <h6>{this.state.user.email} <a href="" onClick={this.handleLoggout}>(Sair)</a></h6>
          </div>

          <div className="row" id="admin">

          </div>
          <Route path={`${this.props.match.url}/horariospe/:id`} component={ HorarioPe } />
          <Route exact={true} path={`${this.props.match.url}/horariospe`} component={HorarioPe} />
          <Route exact={true} path={`${this.props.match.url}/m-horariospe`} component={HorarioPeMobile} />
          
          <Route exact={true} path={`${this.props.match.url}/professores`} component={Professor} />
          <Route exact={true} path={`${this.props.match.url}/m-professores`} component={ProfessorMob} />
          <Route exact={true} path={`${this.props.match.url}/calendarioProvas`} component={CalendarioProvas} />
          <Route exact={true} path={`${this.props.match.url}/m-calendarioProvas`} component={CalendarioProvasMob} />
          <Route exact={true} path={`${this.props.match.url}/cursos`} component={Cursos} />
          <Route exact={true} path={`${this.props.match.url}/horario-de-aula`} component={HorarioDeAula} />
        </div>
      </div >
    )
  }
}