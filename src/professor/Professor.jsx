import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { base } from '../base'

import InputField from '../components/InputField'

export default class Professor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            professores: []
        }

        this.updateProfessor = this.updateProfessor.bind(this)
    }

    componentDidMount = async () => {
        console.log(this.props.match.params.id)
        if (this.props.match.params.id) {
            await base.fetch('professores/' + this.props.match.params.id, {
                context: this,
                asArray: false,
                then: (data) => {
                    this.setState({
                        professores: data
                    })
                }
            })

            await this.getProfessor()
        }
    }

    getProfessor = () => {
        const professor = this.state.professores
        this.nome.value = professor.nome
        this.email.value = professor.email
    }


    updateProfessor(event) {
        event.preventDefault()

        const nome = this.nome.value
        const email = this.email.value

        !this.state.professores.nome ?
            base.push('professores', {
                data: {
                    nome,
                    email
                }
            }).catch(error => {
                console.log(error)
            })
            :
            base.update('professores/' + this.props.match.params.id, {
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
                            <p id="emailHelp" className="form-text text-muted">Ex.: seuemail@gmail.com</p>
                        </div>
                    </div>
                    <div className="form-row">

                        <button className='btn btn-success btn-lg' type='submit'>Salvar</button>

                    </div>
                </form>


                <div className="row">
                    <div className="col-12">
                        <Link to={"/admin/m-professores"} className="btn btn-link btn-lg">Lista de Professores</Link>
                    </div>
                </div>
            </div>
        )
    }
}
