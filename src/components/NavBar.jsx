import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
        return (
            <nav class="dropdown">
                <button class="dropbtn">Ifms</button>
                <div class="dropdown-content">
                    <a href="/admin/Cursos">Cursos</a>
                    <a href="/admin/horariospe">Horario de Pe</a>
                    <a href="/admin/professores">Professores</a>
                    <a href="/admin/calendarioProvas">Provas</a>
                </div>
            </nav>)
    }
}
