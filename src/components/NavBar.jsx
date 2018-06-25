import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
                <a class="navbar-brand" href="/admin">IFMS</a>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/Cursos">Cursos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/horario-pe">Horario de PE</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/professores">Professores</a>
                        </li>
                        <li class="nav-item navbar-right">
                            <a class="nav-link" href="/admin/calendario-provas">Provas</a>
                        </li>
                    </ul>

                </div>
            </nav>
        )
    }
}
