import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { auth } from '../base'
import InputField from '../components/InputField'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.email = null
    this.passwd = null

    this.state = {
      isLoggedIn: false,
      error: false,
      isLogging: false
    }

    this.removeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isLoggedIn: true
        })
      }
    })

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(e) {
    e.preventDefault()

    this.setState({ isLogging: true })
    auth
      .signInWithEmailAndPassword(this.email.value, this.passwd.value)
      .then(user => {
        this.setState({
          isLoggedIn: true
        })
      }).catch(error => {
        this.setState({
          error: true,
          isLogging: false
        })
      })
  }

  componentDidMount() {
    this.removeAuth()
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to='/admin' />
    }
    return (
      <form onSubmit={this.handleLogin}>

        <InputField
          refValue={node => this.email = node}
          idValue='email'
          typeValue='text'
          requiredValue={true}
          textValue='E-mail: ' />

        <InputField
          refValue={node => this.passwd = node}
          idValue='passwd'
          typeValue='password'
          requiredValue={true}
          textValue='Senha: ' />

      
        {this.state.error && <p>E-mail e/ou senha inválidos.</p>}
        <button disabled={this.state.isLogging} type='submit'>Entrar</button>
      </form>
    )
  }
}
