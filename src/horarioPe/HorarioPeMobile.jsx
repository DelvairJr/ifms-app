import React, { Component } from 'react'

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


  renderHorariosPe(key, horariosPe) {
    return (
      <div className="row" key={key}>
        <div className="col-12">
          <div className="card text-center">
            <div className="card-header">
              <h6 className="card-title mb-2">Professor: {horariosPe.professor}</h6>
            </div>
            <div className="card-body">

              <h6 className="card-subtitle mb-2">{horariosPe.dia_semana}</h6>

              <p className="card-text">Local: {horariosPe.local}</p>
              <p className="card-text">Horário: {`${horariosPe.horas_inicio} às ${horariosPe.horas_termino}`}</p>
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
      </div>
    )
  }
}
