import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';

export default function AddExpenseModal({ show, handleClose, budgetId }) {

    const [frmExpenseState, setFrmExpenseState] = useState({
        description: '',
        amount: '',
    });

    function handleChange({ target: { name, value }}) {
        setFrmExpenseState(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const { addExpense } = useBudgets();

    function handleSubmit(e) {
        e.preventDefault();
        addExpense({
            description: frmExpenseState.description,
            amount: parseFloat(frmExpenseState.amount),
            budgetId,
        });
        handleClose();
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense {budgetId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control name='description' onChange={handleChange} type='text' required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control name='amount' onChange={handleChange} type='number' required min={0} step={0.01} />
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='submit'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
  );
}
