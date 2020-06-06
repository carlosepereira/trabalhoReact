import React from 'react'
import IconButton from '../template/iconButton'

export default props => {
    const renderRows = () => {
    const list = props.list || []
    return list.map(todo => (
        <tr key={todo._id}>
            <td className={todo.done ? 'markedAsDone' : ''}>{todo.nome}</td>
            <td className={todo.done ? 'markedAsDone' : ''}>{todo.createdAt}</td>
            <td>
                <IconButton style='danger' icon='trash-o'
                    onClick={() => props.handleRemove(todo)}></IconButton>
            </td>
        </tr>
        ))
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Nomes</th>
                    <th>Data / Hora</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}