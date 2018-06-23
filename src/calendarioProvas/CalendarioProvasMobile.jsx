import React, { Component } from 'react'

import { base } from '../base'
import InputField from '../components/InputField'

export default class CalendarioProvasMobile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            calendarioProvas: []
        }
    }

    componentDidMount = () => {
        base.syncState('calendarioProvas', {
            context: this,
            state: 'calendarioProvas',
            asArray: true,
            queries: {
                orderByChild: 'turma'
            }
        })
    }


    renderCalendarioProvas(key, calendarioProvas) {

        return (
            <div className="row" key={key}>
                <div className="col-12">
                    <div className="card border-dark text-center">
                        <div className="card-header">
                            Turma: {`${calendarioProvas.turma} - ${calendarioProvas.semestre}`}
                        </div>
                        <div className="card-body">
                            <h6 className="card-title mb-2">Data: {calendarioProvas.dataProva}</h6>
                            <p>Disciplina: {calendarioProvas.disciplina}</p>


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

                <h3>Calendário de Provas</h3>
                <div className="row">
                    <div className="col-12">
                        <InputField
                            refValue={node => this.search = node}
                            idValue='search'
                            typeValue='text'
                            requiredValue={true}
                            textValue='Pesquisar turma: '
                            keyUp={this.handleSearch} />
                    </div>
                </div>
                {
                    Object
                        .keys(this.state.calendarioProvas)
                        .map(key => {
                            if (this.state.calendarioProvas[key].turma.toUpperCase()
                                .includes(this.search.value.toUpperCase())) {
                                return this.renderCalendarioProvas(key, this.state.calendarioProvas[key])
                            }

                        })
                }
            </div>
        )
    }
}
