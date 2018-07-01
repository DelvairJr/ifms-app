import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { base } from '../base'
import InputField from '../components/InputField'

export default class HorarioPeMobile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      horariosPe: []
    }
  }

  componentDidMount = () => {
    base.syncState('horariosPe', {
      context: this,
      state: 'horariosPe',
      asArray: true,
      queries: {
        orderByChild: 'nome_professor'
      }
    })
  }

  removerHorarioPe(key) {
    let msg = window.confirm('Deseja excluir este registro?')
    if (msg) {
      base.remove('horariosPe/' + key, error => {
        console.log(error)
      })
    }
  }

  renderHorariosPe(key, horariosPe) {
    return (
      <div className="row" key={key}>
        <div className="col-12">
          <div className="card border-success text-center">
            <div className="card-header">
              <h5 className="card-title">Professor: {horariosPe.professor}</h5>
            </div>
            <div className="card-body">
              <h6 className="card-subtitle text-muted mb-2">Dia: {horariosPe.dia_semana}</h6>

              <p className="card-text">Local: {horariosPe.local}</p>
              <p className="card-text">Horário: {`${horariosPe.horas_inicio} às ${horariosPe.horas_termino}`}</p>
              <div className="card-body">

                <div className="row">
                  <div className="col-6">
                    <Link to={`horariospe/${horariosPe.key}`} className="btn btn-lg btn-link ">Editar</Link></div>
                  <div className="col-6">
                    <button className="btn btn-lg btn-danger" onClick={() => this.removerHorarioPe(this.state.horariosPe[key].key)}>
                      Excluir
                    </button>
                  </div>

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

        <h3>Horário de Permanência</h3>
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
            .keys(this.state.horariosPe)
            .map(key => {
              if (this.state.horariosPe[key].professor.toUpperCase()
                .includes(this.search.value.toUpperCase())) {
                return this.renderHorariosPe(key, this.state.horariosPe[key])
              }
            })
        }
        <div className="row">
          <div className="col-12"><a href="/admin/horariospe" className='btn btn-default btn-lg'>Voltar</a></div>
        </div>
      </div>
    )
  }
}
