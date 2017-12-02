import React, { Component }  from 'react'
import Gun from 'gun/gun'
import path from 'gun/lib/path'
import './style.css'


export default class Todos extends Component {
  constructor({gun}) {
    super()
    this.gun = gun.get('todos');
    this.state = {newTodo: '', todos: []}
  }

  componentWillMount() {
    this.gun.map().on((val, key) => {
      this.setState(prevState => ({
        todos: [
          ...prevState.todos.filter(todo => todo.key !== key), 
          { key, val }
        ]
      }))
    })
  }

  add = e => {
    e.preventDefault()
    this.gun.set(this.state.newTodo)
    this.setState({newTodo: ''})
  }

  del = key => {
    this.gun.path(key).put(null)
  }


  handleChange = e => this.setState({ newTodo: e.target.value})

  render() {
    console.log(this.state.todos)
    return <div>
      <form onSubmit={this.add}>
        <input value={this.state.newTodo} onChange={this.handleChange} />
        <button onClick={this.add}>Add</button>
      </form>
      <br />
      <ul>
        {this.state.todos.map((todo, i) => todo && <li key={i} onClick={_=>this.del(todo.key)}>{todo.val}</li>)}
      </ul>
    </div>
  }

}

