import React from 'react'
import {Card, Button} from 'react-bootstrap'

const Todo =(props)=>{
    const { data, handleDelete, handleComplete, handleEdit } = props
    const handleDisplay = data.completed ? 'none' : ''
    const handleColor = data.completed ? '#cdcdcd' : 'black'
    return(
        <Card body className='m-2' style={{color : handleColor}}>
            {data.task}
            <div className='float-right'>
                <Button variant="success" className='mr-2' 
                style={{display : handleDisplay}} onClick={() => handleComplete(data.id)}>
                    Complete
                </Button>
                <Button variant="warning" className='mr-2' 
                style={{display : handleDisplay}} onClick ={() => handleEdit(data.id)}>
                    edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(data.id)}>
                    Delete
                </Button>
            </div>
        </Card>
    )
}


export default Todo