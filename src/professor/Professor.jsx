import React, { Component } from 'react'
import { base } from '../base'

import InputField from '../components/InputField'

export default class Professor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            professores: [],
            key: null,
            search: ''
        }

        this.removerProfessor = this.removerProfessor.bind(this)
        this.updateProfessor = this.updateProfessor.bind(this)
    }

    componentDidMount() {
        base.syncState('professores', {
            context: this,
            state: 'professores',
            asArray: true,
            queries: {
                orderByChild: 'nome'
            }
        })
    }

    getProfessor(key) {
        const professor = this.state.professores[key]
        this.nome.value = professor.nome
        this.email.value = professor.email

        this.setState({
            key: this.state.professores[key]
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

    updateProfessor(event) {
        event.preventDefault()

        const nome = this.nome.value
        const email = this.email.value

        !this.state.key ?
            base.push('professores', {
                data: {
                    nome,
                    email
                }
            }).catch(error => {
                console.log(error)
            })
            :
            base.update('professores/' + this.state.key.key, {
                data: {
                    nome,
                    email
                }
            }).then(() => {
                this.setState({
                    key: null
                })
            }).catch(error => {
                console.log(error)
            })

        this.nome.value = ''
        this.email.value = ''

        this.nome.focus()
    }

    handleSearch = () => {
        this.setState({
            search: this.search.value
        })
    }

    renderProfessores(key, professores) {
        return (
            <div className="row" key={key}>
                <div className="col-12">
                    <div className="card border-dark text-center">
                        <div className="card-header">
                            Professor: {professores.nome}
                        </div>
                        <div className="card-body">
                            <h6 className="card-title text-muted mb-2">Email: {professores.email}</h6>

                            <div className="card-body">
                                <button className="btn btn-sm btn-secondary card-link" onClick={() => this.getProfessor(key)}>
                                    Editar
                                </button>
                                <button className="btn btn-sm btn-danger card-link" onClick={() => this.removerProfessor(this.state.professores[key].key)}>
                                    Excluir
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="col-12">
                <h3>Cadastrar Professor</h3>

                <form onSubmit={this.updateProfessor}>

                    <div className="form-row">
                        <div className="form-group col-md-6">

                            <InputField
                                refValue={node => this.nome = node}
                                idValue='nome'
                                typeValue='text'
                                requiredValue={true}
                                textValue='Nome: ' />
                        </div>

                        <div className="form-group col-md-6">

                            <InputField
                                refValue={node => this.email = node}
                                idValue='email'
                                typeValue='text'
                                requiredValue={true}
                                textValue='Email: ' />
                            <smal id="emailHelp" className="form-text text-muted">Ex.: seuemail@gmail.com</smal>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <button className='btn btn-primary' type='submit'>Salvar</button>
                        </div>
                    </div>
                </form>


                <div className="row">
                    <div className="col-12">
                        <h4>Professores</h4>

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
                    </div>
                </div>
            </div>
        )
    }
}
