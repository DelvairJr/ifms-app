import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { base } from '../base'

import InputField from '../components/InputField'

export default class CursoMobile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cursos: []
        }
    }

    componentDidMount = () => {
        base.syncState('cursos', {
            context: this,
            state: 'cursos',
            asArray: true,
            queries: {
                orderByChild: 'nome'
            }
        })
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
                    <div className="card border-success text-center">
                        <div className="card-header">
                            <h5 className="card-title  mb-2"> {cursos.nome}</h5>
                        </div>
                        <div className="card-body">
                            <h6 className="card-subtitle text-muted mb-2">{cursos.nome_abreviado}</h6>
                            <div className="row">
                                <div className="col-6">
                                    <Link to={`cursos/${cursos.key}`} className="btn btn-lg btn-link ">Editar</Link>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-lg btn-danger" onClick={() => this.removerCurso(this.state.cursos[key].key)}>
                                        Excluir
                                    </button>
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
                <div className="row">
                    <div className="col-12">
                        <Link to={"/admin/cursos"} className='btn btn-default btn-lg'>Voltar</Link>
                    </div>
                </div>
            </div>
        )
    }
}
