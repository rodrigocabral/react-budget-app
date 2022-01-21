import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import AddExpenseModal from "./AddExpenseModal";
import { useState } from "react";

export default function BudgetCard({name, amount, max, gray, budgetId}) {
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const amountFormatted = currencyFormatter.format(amount);
    const maxFromatted = currencyFormatter.format(max);
    const bgClassNames = [];

    if(amount > max) {
        bgClassNames.push('bg-danger', 'bg-opacity-10');
    } else if(gray) {
        bgClassNames.push('bg-ligth');
    }

    return (
        <>
            <Card className={ bgClassNames.join(' ') }>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                        <div className="me-2">{name}</div>
                        <div className="d-flex align-items-baseline">{amountFormatted} 
                        <span className="text-muted fs-6 ms-1">/ {maxFromatted}</span></div>
                    </Card.Title>
                    <ProgressBar 
                    className="rounded-pill" variant={getProgressBarVariant(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                    />
                    <Stack direction="horizontal" gap={2} className="mt-4">
                        <Button onClick={() => setShowAddExpenseModal(true)} variant="outline-primary" className="ms-auto">
                            Add Expense
                        </Button>
                        <Button variant="outline-secondary">View Expenses</Button>
                    </Stack>
                </Card.Body>
            </Card>
            <AddExpenseModal budgetId={budgetId} show={showAddExpenseModal} handleClose={() => setShowAddExpenseModal(false)} />
        </>
    )
}

function getProgressBarVariant(amount, max) {
     const ratio = amount / max;

     if (ratio < .5) {
         return 'success';
     }

     if (ratio < .75) {
         return 'warning';
     }

     return 'danger';
}
