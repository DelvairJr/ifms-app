import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { base } from '../base'

import InputField from '../components/InputField'

export default class Curso extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cursos: []
        }

        //this.renderCurso = this.renderCurso.bind(this)
        this.updateCurso = this.updateCurso.bind(this)
    }

    componentDidMount = async () => {
        console.log(this.props.match.params.id)
        
        if (this.props.match.params.id) {
            await base.fetch('cursos/' + this.props.match.params.id, {
                context: this,
                asArray: false,
                then: (data) => {
                    this.setState({
                        cursos: data
                    })
                }
            })

            await this.getCursos()
        }
    }

    getCursos = () => {
        const curso = this.state.cursos
        this.nome.value = curso.nome
        this.nome_abreviado.value = curso.nome_abreviado

    }

    updateCurso(event) {
        event.preventDefault()

        const nome = this.nome.value
        const nome_abreviado = this.nome_abreviado.value.toUpperCase()

        !this.state.cursos.nome ?
            base.push('cursos', {
                data: {
                    nome,
                    nome_abreviado
                }
            }).catch(error => {
                console.log(error)
            })
            :
            base.update('cursos/' +  this.props.match.params.id, {
                data: {
                    nome,
                    nome_abreviado
                }
            }).then(() => {
                this.setState({
                    key: null
                })
            }).catch(error => {
                console.log(error)
            })

        this.nome.value = ''
        this.nome_abreviado.value = ''

        this.nome.focus()
    }




    render() {
        return (
            <div className="col-12">

                <h3>Cadastrar Curso</h3>

                <form onSubmit={this.updateCurso}>

                    <div className="form-row">

                        <div className="form-group col-md-8">
                            <InputField
                                refValue={node => this.nome = node}
                                idValue='nome'
                                typeValue='text'
                                requiredValue={true}
                                textValue='Nome do Curso: ' />
                        </div>

                        <div className="form-group col-md-4">
                            <InputField
                                refValue={node => this.nome_abreviado = node}
                                idValue='nome_abreviado'
                                typeValue='text'
                                requiredValue={true}
                                textValue='Nome do Cruso(Abreviado): ' />
                        </div>

                    </div>
                    <div className="form-row">
                        <button className='btn btn-success btn-lg' type='submit'>Salvar</button>
                    </div>
                </form >

                <div className="row">
                    <div className="col-12">
                        <Link className='btn btn-default btn-lg' to={"/admin/m-cursos"} >Lista de horario</Link>
                    </div>
                </div>
            </div >
        )
    }
}
