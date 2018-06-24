import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { base } from '../base'
import InputField from '../components/InputField'

export default class HorarioPE extends Component {
    constructor(props) {
        super(props)
        this.state = {
            horariosPe: [],
            professores: [],
            key: null,
            search: ''
        }

        this.renderHorariosPe = this.renderHorariosPe.bind(this)
        this.removerHorarioPe = this.removerHorarioPe.bind(this)
        this.updateHorarioPe = this.updateHorarioPe.bind(this)
    }

    componentDidMount() {
        base.syncState('horariosPe', {
            context: this,
            state: 'horariosPe',
            asArray: true
        })
        base.syncState('professores', {
            context: this,
            state: 'professores',
            asArray: true,
            queries: {
                orderByChild: 'nome'
            }
        })
    }

    getHorarioPe(key) {
        const horario = this.state.horariosPe[key]
        this.dia_semana.value = horario.dia_semana
        this.professor.value = horario.professor
        this.local.value = horario.local
        this.horas_inicio.value = horario.horas_inicio
        this.horas_termino.value = horario.horas_termino

        this.setState({
            key: this.state.horariosPe[key]
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

    updateHorarioPe(event) {
        event.preventDefault()

        const dia_semana = this.dia_semana.value
        const professor = this.professor.value
        const local = this.local.value
        const horas_inicio = this.horas_inicio.value
        const horas_termino = this.horas_termino.value
        
        let horario = ''

       /*  const professor = {
            [key_professor]: true
        }


         const horario = {
              [this.state.key.key]:true
          }*/

        !this.state.key ?
            horario = base.push('horariosPe', {
                data: {
                    dia_semana,
                    professor,
                    local,
                    horas_inicio,
                    horas_termino
                }
            }).catch(error => {
                console.log(error)
            })
            :
            base.update('horariosPe/' + this.state.key.key, {
                data: {
                    dia_semana,
                    professor,
                    local,
                    horas_inicio,
                    horas_termino
                }

            }).catch(error => {
                console.log(error)
            })


        this.dia_semana.value = ''
        this.professor.value = ''
        this.local.value = ''
        this.horas_inicio.value = ''
        this.horas_termino.value = ''

        this.dia_semana.focus()
    }

    renderHorariosPe(key, horariosPe) {
        return (
            <div className="row" key={key}>
                <div className="col-12">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Professor: {horariosPe.professor}</h5>
                            <h6 className="card-subtitle text-muted mb-2">Dia: {horariosPe.dia_semana}</h6>

                            <p className="card-text">Local: {horariosPe.local}</p>
                            <p className="card-text">Horário: {`${horariosPe.horas_inicio} às ${horariosPe.horas_termino}`}</p>
                            <div className="card-body">
                                <button className="btn btn-sm btn-secondary card-link" onClick={() => this.getHorarioPe(key)}>
                                    Editar
                                </button>
                                <button className="btn btn-sm btn-danger card-link" onClick={() => this.removerHorarioPe(this.state.horariosPe[key].key)}>
                                    Excluir
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }


    handleOptProfessores = (posicao) => {
        const professor = this.state.professores[posicao]
        return (
            <option key={professor.key} >{professor.nome}</option>
        )
    }

    handleSearch = () => {
        this.setState({
            search: this.search.value
        })
    }

    render() {
        return (
            <div className="col-12">


                <h3>Cadastrar Horário de Permanência</h3>
                <form onSubmit={this.updateHorarioPe}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="col-form-label" htmlFor="dia_semana">Dia: </label>
                            <select className="form-control" ref={node => this.dia_semana = node} id="dia_semana" required="true">
                                <option>Segunda-feira</option>
                                <option>Terça-feira</option>
                                <option>Quarta-feira</option>
                                <option>Quinta-feira</option>
                                <option>Sexta-feira</option>
                            </select>

                        </div>
                        <div className="form-group col-md-6">

                            <label className="col-form-label" htmlFor="professor">Professores: </label>
                            <select className="form-control" ref={node => this.professor = node} id="professor" required="true">
                                {Object
                                    .keys(this.state.professores)
                                    .map(posicao => this.handleOptProfessores(posicao))
                                }
                            </select>

                        </div>
                    </div>
                    <div className="form-row">

                        <div className="form-group col-md-6">
                            <label className="col-form-label" htmlFor="local">Local: </label>
                            <select className="form-control" ref={node => this.local = node} id="local" required="true">
                                <option >IFMS</option>
                                <option >UFMS</option>
                                <option >CEMID</option>
                            </select>
                        </div>

                        <div className="form-group col-md-3">
                            <InputField
                                refValue={node => this.horas_inicio = node}
                                idValue='horas_inicio'
                                typeValue='text'
                                requiredValue={true}
                                textValue='Hora de inicio: ' />
                        </div>

                        <div className="form-group col-md-3">
                            <InputField
                                refValue={node => this.horas_termino = node}
                                idValue='horas_termino'
                                typeValue='text'
                                requiredValue={true}
                                textValue='Hora de termino: ' />
                        </div>
                    </div>

                    <button className='btn btn-primary' type='submit'>Salvar</button>
                </form >

                <div className="row">
                    <div className="col-12">
                        <h3>Horários de Permanência</h3>
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
                </div>
            </div >
        )
    }
}