import React, { Component } from 'react'
import { base } from '../base'

import InputField from '../components/InputField'

export default class Curso extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cursos: [],
            key: null,
            search: ''
        }

        //this.renderCurso = this.renderCurso.bind(this)
        this.updateCurso = this.updateCurso.bind(this)
        this.removerCurso = this.removerCurso.bind(this)
    }

    componentDidMount() {
        base.syncState('cursos', {
            context: this,
            state: 'cursos',
            asArray: true,
            queries: {
                orderByChild: 'nome'
            }
        })
    }

    getCursos(key) {
        const curso = this.state.cursos[key]
        this.nome.value = curso.nome
        this.nome_abreviado.value = curso.nome_abreviado

        this.setState({
            key: this.state.cursos[key]
        })
    }

    updateCurso(event) {
        event.preventDefault()

        const nome = this.nome.value
        const nome_abreviado = this.nome_abreviado.value.toUpperCase()

        !this.state.key ?
            base.push('cursos', {
                data: {
                    nome,
                    nome_abreviado
                }
            }).catch(error => {
                console.log(error)
            })
            :
            base.update('cursos/' + this.state.key.key, {
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

    removerCurso(key) {
        let msg = window.confirm('Deseja excluir este registro?')
        if (msg) {
            base.remove('cursos/' + key, error => {
                console.log(error)
            })
        }
    }

    renderCurso(key, cursos) {
        return (
            <div className="row" key={key}>
                <div className="col-12">
                    <div className="card border-dark text-center">
                        <div className="card-body">
                            <h6 className="card-title  mb-2"> {cursos.nome}</h6>
                            <h6 className="card-subtitle text-muted mb-2">{cursos.nome_abreviado}</h6>


                            <div className="card-body">
                                <button className="btn btn-sm btn-secondary card-link" onClick={() => this.getCursos(key)}>
                                    Editar
                                </button>
                                <button className="btn btn-sm btn-danger card-link" onClick={() => this.removerCurso(this.state.cursos[key].key)}>
                                    Excluir
                                </button>
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
    // nome text
    // sigla text
    // formação text
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

                    <button className='btn btn-primary' type='submit'>Salvar</button>
                </form >

                <div className="row">
                    <div className="col-12">
                        <h3>Cursos</h3>
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
                                .keys(this.state.cursos)
                                .map(key => {
                                    if (this.state.cursos[key].nome.toUpperCase()
                                        .includes(this.search.value.toUpperCase())) {
                                        return this.renderCurso(key, this.state.cursos[key])
                                    }
                                })
                        }
                    </div>
                </div>

                
            </div >
        )
    }
}
