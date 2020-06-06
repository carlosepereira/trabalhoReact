import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './cadastroForm'
import TodoList from './cadastroList'

const URL = 'http://localhost:3003/api/cadastros'

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = { nome: '', list: [] }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh()
    }

    handleClear() {
        this.refresh()
    }

    handleSearch(){
        this.refresh(this.state.nome)
    }

    refresh(nome = '') {
        const search = nome ? `&nome__regex=/${nome}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, nome, list: resp.data}))
    }

    handleChange(e) {
        this.setState({...this.state, nome: e.target.value})
    }

    handleAdd() {
        const nome = this.state.nome
        axios.post(URL, { nome })
        .then(resp => this.refresh())
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.nome))
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done:true})
            .then(resp => this.refresh(this.state.nome))
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done:false})
            .then(resp => this.refresh(this.state.nome))
    }

    render() {
        return (
            <div>
                <PageHeader name='Cadastro' small='Pessoas'></PageHeader>
                <TodoForm 
                    nome={this.state.nome}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />
                <TodoList 
                    list={this.state.list}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    handleRemove={this.handleRemove} />
            </div>
        )
    }
}