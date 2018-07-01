import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { base } from '../base'
import InputField from '../components/InputField'

export default class HorarioPE extends Component {
    constructor(props) {
        super(props)
        this.state = {
            horariosPe: [],
            professores: []
        }

        this.saveHorarioPe = this.saveHorarioPe.bind(this)
    }

    componentDidMount = async () => {
        console.log(this.props.match.params.id)
        if (this.props.match.params.id) {
            await base.fetch('horariosPe/' + this.props.match.params.id, {
                context: this,
                asArray: false,
                then: (data) => {
                    this.setState({
                        horariosPe: data
                    })
                }
            })

            await this.getHorarioPe()
        }

        base.syncState('professores', {
            context: this,
            state: 'professores',
            asArray: true,
            queries: {
                orderByChild: 'nome'
            }
        })
    }



    getHorarioPe = () => {
        const horario = this.state.horariosPe
        this.dia_semana.value = horario.dia_semana
        this.professor.value = horario.professor
        this.local.value = horario.local
        this.horas_inicio.value = horario.horas_inicio
        this.horas_termino.value = horario.horas_termino
    }



    saveHorarioPe(event) {
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

        !this.state.horariosPe.dia_semana ?
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
            base.update('horariosPe/' + this.props.match.params.id, {
                data: {
                    dia_semana,
                    professor,
                    local,
                    horas_inicio,
                    horas_termino
                }

            }).then(() => {
                this.setState({
                    horariosPe: {}
                })
                this.props.match.params.id = ''
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



    handleOptProfessores = (posicao) => {
        const professor = this.state.professores[posicao]
        return (
            <option key={professor.key} >{professor.nome}</option>
        )
    }


    render() {
        return (
            <div className="col-12">

                <div className="row">

                    <h4> Horário de Permanência</h4>

                    <form onSubmit={this.saveHorarioPe}>
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
                        <div className="form-row">
                            <button className='btn btn-success btn-lg' type='submit'>Salvar</button>
                        </div>
                    </form >
                </div>

                <div className="row">
                    <div className="col-12">
                        <Link className='btn btn-default btn-lg' to={"/admin/m-horariospe"} >Lista de horario</Link>
                    </div>
                </div>
            </div >
        )
    }
}