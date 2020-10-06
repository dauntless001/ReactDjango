import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from './components/navBar'
import Todo from './components/Todo'
import { AxiosGet, AxiosDelete, AxiosPost } from './AxiosService'
import Axios from 'axios'
import {Modal, Card, Form, Button } from 'react-bootstrap'


class App extends React.Component{
  state ={
    todos : [],
    show : false,
    message : '',
    edited : false,
    task : '',
    editedId : ''
  }
  componentDidMount(){
    AxiosGet('http://127.0.0.1:8000/api/')
    .then(res => {
      this.setState({todos : res.data})})
    .catch(err => console.log(err))
  }
  handleAdd = (todo) => {
    console.log(todo, 'todossss')
    Axios.post('http://127.0.0.1:8000/api/', {task : todo.task})
    .then(res => {
      this.setState({todos : res.data})
      console.log(res.data)})
    .catch(err => console.log(err))
  }
  handleDelete = (id) =>{
    AxiosDelete(`http://127.0.0.1:8000/api/${id}/`)
    .then(res => {
      this.setState({ show : true,
      message : 'Task Deleted Successfully', edited : false })})
    .catch(err => console.log(err))
    const currState = this.state.todos.filter(todo =>{
      return todo.id !== id
    })
    this.setState({todos : currState})
  }
  handleChange = e =>{
    const { name, value } = e.target
    this.setState({ [name] : value })
  }
  handleEdit = (id) =>{
    this.setState({ show : true, edited : true, editedId : id })
    const {todos} = this.state
    const editedTodo = todos.find(todo => {
      return todo.id === id
    })
    this.setState({ task : editedTodo.task })
  }
  handleSubmit = (e) =>{
    const { editedId, task } = this.state
    Axios.put(`http://127.0.0.1:8000/api/${editedId}/`, {task : task})
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }
  handleComplete = (id) =>{
    AxiosPost(`http://127.0.0.1:8000/api/${id}/`)
    .then(res => {
      this.setState({ show : true,
      message : 'Congratulations You did it', edited : false })})
    .catch(err => console.log(err))
    this.setState(prevState =>{
      const currState = prevState.todos.map(todo =>{
        if (todo.id === id){
          return {...todo, completed : true}
        }
        else{
        return todo}
      })
      return { todos : currState }
    })
  }

  handleShow = () => {
    this.setState({show : true})
}

  handleClose = () => {
      this.setState({show : false})
  }
  Example = () => {
    const {todos} = this.state
    const editedTodo = todos.find(todo => {
      return todo.id === this.state.editedId
    })
    return (
        <Modal show={this.state.show} 
        onHide={this.handleClose}
        centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.edited ? `Edit Todo "${editedTodo.task}"`: 'Operation Successful'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.edited ? 
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Task</Form.Label>
                  <Form.Control name='task' value={this.state.task} 
                    type="text" placeholder="Enter task" onChange={this.handleChange}
                  />
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Update</Button>
              </Form>: this.state.message}
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
    );
  }
  render(){
    const { todos } = this.state
    const todo = todos.length !== 0 ? todos.map(todo => {
      return (
      <Todo key={todo.id} data={todo} handleComplete={this.handleComplete}
      handleDelete={this.handleDelete}
      handleEdit={this.handleEdit}
      />)}): <Card body className='text-center'>No Todo's Yet</Card>
    return(
      <React.Fragment>
        <NavBar handleAdd={this.handleAdd}/>
        <div className='col-8 mx-auto m-5'>
          {todo}
        </div>
        <this.Example/>
      </React.Fragment>
    )
  }
}

export default App;

