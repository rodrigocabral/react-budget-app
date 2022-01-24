import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';

export default function AddBudgetModal({ show, handleClose }) {

    const [frmBudgetState, setFrmBudgetState] = useState({
        name: '',
        max: '',
    });

    function handleChange({ target: { name, value }}) {
        setFrmBudgetState(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const { addBudget } = useBudgets();

    function handleSubmit(e) {
        e.preventDefault();
        addBudget({
            name: frmBudgetState.name,
            max: parseFloat(frmBudgetState.max),
        });
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' onChange={handleChange} type='text' required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='max'>
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control name='max' onChange={handleChange} type='number' required min={0} step={0.01} />
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='submit'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
        );
}
