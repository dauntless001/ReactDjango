import React from 'react'
import {Navbar, Nav, Modal, Button, Form } from 'react-bootstrap'



class NavBar extends React.Component{
    state = {
        task : '',
        show : false
    }
    handleChange = (e) =>{
        const { name, value } = e.target
        this.setState({
            [name] : value
        })
    }
    handleShow = () => {
        this.setState({show : true})
    }

    handleClose = () => {
        this.setState({show : false})
    }
    handleSubmit = e =>{
        this.props.handleAdd(this.state)
    }
    Example = () => {
   
        return (
            <Modal show={this.state.show} 
            onHide={this.handleClose}
            centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Todo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Task</Form.Label>
                        <Form.Control name='task' value={this.state.task} 
                        type="text" placeholder="Enter task" onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                    </Form>
                </Modal.Body>
              <Modal.Footer>

                <Button variant="danger" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
        );
      }
      
    render(){
        return (
            <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                    <Nav.Link className='btn btn-dark text-light' onClick={this.handleShow}>Add</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <this.Example />
            </div>
        )
    }
}

export default NavBar;

