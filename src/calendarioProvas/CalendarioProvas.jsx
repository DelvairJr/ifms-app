import React, { Component } from 'react'
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

        this.renderCalendarioProvas = this.renderCalendarioProvas.bind(this)
        this.removerCalendarioProvas = this.removerCalendarioProvas.bind(this)
        this.updateCalendarioProvas = this.updateCalendarioProvas.bind(this)
    }

    componentDidMount() {
        base.syncState('calendarioProvas', {
            context: this,
            state: 'calendarioProvas',
            asArray: true
        })
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

        !this.state.key ?
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
            base.update('calendarioProvas/' + this.state.key.key, {
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

    getCalendarioProvas(key) {
        const prova = this.state.calendarioProvas[key]
        this.turma.value = prova.turma
        this.semestre.value = prova.semestre
        this.dataProva.value = prova.dataProva
        this.disciplina.value = prova.disciplina

        this.setState({
            key: this.state.calendarioProvas[key]
        })
    }

    removerCalendarioProvas(key) {
        let msg = window.confirm('Deseja excluir este registro?')
        if (msg) {
            base.remove('calendarioProvas/' + key, error => {
                console.log(error)
            })
        }
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


    modal() {

    }

    handleOptCursos = (posicao) => {
        const cursos = this.state.cursos[posicao]
        return (
            <option key={cursos.key} >{cursos.nome_abreviado}</option>
        )
    }


    handleSearch = () => {
        this.setState({
            search: this.search.value
        })
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

                    <div className="row justify-content-end">
                        <div className="col-1 align-self-center">
                            <button className='btn btn-primary' type='submit'>Salvar</button>
                        </div>

                    </div>

                </form>


                <div className="row">
                    <div className="col-12">
                        <h4>Provas</h4>

                        <div className="row">
                            <div className="col-12">
                                <InputField
                                    refValue={node => this.search = node}
                                    idValue='search'
                                    typeValue='text'
                                    requiredValue={true}
                                    textValue='Pesquisa por turma: '
                                    keyUp={this.handleSearch} />
                            </div>
                        </div>
                        <div className="row" >
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
                    </div>
                </div>

                
            </div>
        )
    }


}

