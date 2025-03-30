import { createContext, useReducer } from "react";


const Dummy_Expenses = [{
    id: 'e1',
    description: 'a packet of bread',
    amount: 3.95,
    date: new Date('2025-03-28')
},
{
    id: 'e2',
    description: 'Netflix Subscription',
    amount: 27.99,
    date: new Date('2025-03-28')
},

{
    id: 'e3',
    description: 'Fuel expense',
    amount: 98.91,
    date: new Date('2025-02-28')
},

{
    id: 'e4',
    description: 'Apple airpod pro 3',
    amount: 399.43,
    date: new Date('2024-01-28')
},

{
    id: 'e5',
    description: 'keyboard logitech',
    amount: 99.95,
    date: new Date('2024-02-26')
},

{
    id: 'e6',
    description: 'Fuel expense',
    amount: 98.91,
    date: new Date('2025-02-28')
},

{
    id: 'e7',
    description: 'Apple airpod pro 3',
    amount: 399.43,
    date: new Date('2024-01-28')
},

{
    id: 'e8',
    description: 'keyboard logitech',
    amount: 99.95,
    date: new Date('2024-02-26')
},
]


export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {

    },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
});

function expenseReducer(state, action) {
    switch (action.type) {
        case 'Add':
            const id = new Date().toString() + Math.random().toString();

            return [{ ...action.payload, id: id }, ...state]
        case 'Update':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;


        case 'Delete':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;

    }
}


function ExpenseContextProvider({ children }) {

    const [expenseState, dispatch] = useReducer(expenseReducer, Dummy_Expenses);

    function addExpense(expenseData) {
        dispatch({ type: 'Add', payload: expenseData });
    }

    function deleteExpense(id, expenseData) {
        dispatch({ type: 'Delete', payload: id, data: expenseData });
    }
    function updateExpense(id, expenseData) {
        dispatch({ type: 'Update', payload: { id, data: expenseData } });
    }


    const value = {
        expenses: expenseState,
        addExpense,
        deleteExpense,
        updateExpense,
    };

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export default ExpenseContextProvider;