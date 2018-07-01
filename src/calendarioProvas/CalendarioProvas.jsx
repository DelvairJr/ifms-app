import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { base } from '../base'

import InputField from '../components/InputField'

export default class CalendarioProvas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            calendarioProvas: [],
            cursos: [],
            key: null,
            serch: ''
        }

        this.updateCalendarioProvas = this.updateCalendarioProvas.bind(this)
    }

    componentDidMount = async () => {
        console.log(this.props.match.params.id)
        if (this.props.match.params.id) {
            await base.fetch('calendarioProvas/' + this.props.match.params.id, {
                context: this,
                asArray: false,
                then: (data) => {
                    this.setState({
                        calendarioProvas: data
                    })
                }
            })

            await this.getCalendarioProvas()
        }
        base.syncState('cursos', {
            context: this,
            state: 'cursos',
            asArray: true,
            queries: {
                orderByChild: 'nome_abreviado'
            }
        })
    }

    updateCalendarioProvas(event) {
        event.preventDefault()

        const turma = this.turma.value
        const semestre = this.semestre.value
        const dataProva = this.dataProva.value
        const disciplina = this.disciplina.value

        !this.state.calendarioProvas.turma ?
            base.push('calendarioProvas', {
                data: {
                    turma,
                    semestre,
                    dataProva,
                    disciplina
                }
            }).catch(error => {
                console.log(error)
            })
            :
            base.update('calendarioProvas/' + this.props.match.params.id, {
                data: {
                    turma,
                    semestre,
                    dataProva,
                    disciplina
                }
            }).then(() => {
                this.setState({
                    key: null
                })
            }).catch(error => {
                console.log(error)
            })

        this.turma.value = ''
        this.semestre.value = ''
        this.dataProva.value = ''
        this.disciplina.value = ''

        this.turma.focus()
    }

    getCalendarioProvas = () => {
        const prova = this.state.calendarioProvas
        this.turma.value = prova.turma
        this.semestre.value = prova.semestre
        this.dataProva.value = prova.dataProva
        this.disciplina.value = prova.disciplina

    }


    renderCalendarioProvas(key, calendarioProvas) {

        return (

            <div className="col-6" key={key}>
                <div className="card border-dark text-center">
                    <div className="card-header">
                        Turma: {`${calendarioProvas.turma} - ${calendarioProvas.semestre}`}
                    </div>
                    <div className="card-body">
                        <h6 className="card-title mb-2">Data: {calendarioProvas.dataProva}</h6>
                        <p>Disciplina: {calendarioProvas.disciplina}</p>
                        <div className="card-body">
                            <button className="btn btn-sm btn-secondary card-link" onClick={() => this.getCalendarioProvas(key)}>
                                Editar
                                </button>
                            <button className="btn btn-sm btn-danger card-link" onClick={() => this.removerCalendarioProvas(this.state.calendarioProvas[key].key)}>
                                Excluir
                            </button>


                        </div>

                    </div>
                </div>
            </div>

        )
    }

    handleOptCursos = (posicao) => {
        const cursos = this.state.cursos[posicao]
        return (
            <option key={cursos.key} >{cursos.nome_abreviado}</option>
        )
    }


    render() {
        let semestre = []
        for (let i = 1; i < 8; i++) {
            semestre.push(<option>{i}</option>)
        }
        return (

            <div className="col-12">

                <h3>Horário de provas</h3>

                <form onSubmit={this.updateCalendarioProvas}>

                    <div className="form-row">
                        <div className="form-group col-md-4">

                            <label className="col-form-label" htmlFor="Turma">Turma: </label>
                            <select className="form-control" ref={node => this.turma = node} id="turma" required="true">
                                {Object
                                    .keys(this.state.cursos)
                                    .map(posicao => this.handleOptCursos(posicao))
                                }
                            </select>
                        </div>

                        <div className="form-group col-md-1">
                            <label className="col-form-label" htmlFor="semestre">Semestre: </label>
                            <select className="form-control" ref={node => this.semestre = node} id="semestre" required="true">
                                {semestre}
                            </select>

                        </div>

                        <div className="form-group col-md-3">

                            <InputField
                                refValue={node => this.dataProva = node}
                                idValue='dataProva'
                                typeValue='date'
                                requiredValue={true}
                                textValue='Data da prova: ' />
                        </div>

                        <div className="form-group col-md-4">

                            <InputField
                                refValue={node => this.disciplina = node}
                                idValue='disciplina'
                                typeValue='text'
                                requiredValue={true}
                                textValue='Disciplina: ' />
                        </div>
                    </div>

                    <div className="form-row">
                        <button className='btn btn-success btn-lg' type='submit'>Salvar</button>
                    </div>

                </form>



                <div className="row">
                <Link className='btn btn-default btn-lg' to={"/admin/m-calendarioprovas"} >Lista de Provas</Link>
                </div>

            </div>
        )
    }


}

