import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { base } from '../base'
import InputField from '../components/InputField'

export default class ProfessorMobile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      professores: []
    }
  }

  componentDidMount = () => {
    base.syncState('professores', {
      context: this,
      state: 'professores',
      asArray: true,
      queries: {
        orderByChild: 'nome'
      }
    })
  }

  removerProfessor(key) {
    let msg = window.confirm('Deseja excluir este registro?')
    if (msg) {
      base.remove('professores/' + key, error => {
        console.log(error)
      })
    }
  }

  renderProfessores(key, professores) {
    return (
      <div className="row" key={key}>
        <div className="col-12">
          <div className="card border-success text-center">
            <div className="card-header">
              Professor: {professores.nome}
            </div>
            <div className="card-body">
              <h6 className="card-title text-muted mb-2">Email: {professores.email}</h6>

              <div className="row">
                <div className="col-6">
                  <Link to={`professores/${professores.key}`} className="btn btn-lg btn-link ">Editar</Link>
                </div>
                <div className="col-6">
                  <button className="btn btn-lg btn-danger" onClick={() => this.removerProfessor(this.state.professores[key].key)}>
                    Excluir
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleSearch = () => {
    this.setState({
      search: this.search.value
    })
  }

  render() {
    return (
      <div className='col-12'>

        <h3>Professores</h3>
        <div className="row">
          <div className="col-12">
            <InputField
              refValue={node => this.search = node}
              idValue='search'
              typeValue='text'
              requiredValue={true}
              textValue='Pesquisa: '
              keyUp={this.handleSearch} />
          </div>
        </div>

        {
          Object
            .keys(this.state.professores)
            .map(key => {
              if (this.state.professores[key].nome.toUpperCase()
                .includes(this.search.value.toUpperCase())) {
                return this.renderProfessores(key, this.state.professores[key])
              }
            })
        }

        <div className="row">
          <div className="col-12"><a href="/admin/professores" className='btn btn-default btn-lg'>Voltar</a></div>
        </div>
      </div>
    )
  }
}
