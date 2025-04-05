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
{
    id: 'e9',
    description: 'Burger 🍔',
    amount: 11.99,
    date: new Date(),
},
{
    id: 'e10',
    description: 'Coffee ☕',
    amount: 4.99,
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
}

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

            const payload = action.payload;

            const newExpense = {
                id: id,
                description: payload.description,
                amount: parseFloat(payload.amount),
                date: payload.date,

            };

            return [newExpense, ...state];

        case 'Update':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const data = action.payload.data;

            const updatedItem = {
                ...updatableExpense,
                description: data.description,
                amount: parseFloat(data.amount),
                date: data.date, // ✅ Already a Date object
            };

            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;



        case 'Delete':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;

        case 'Reset':
            return [...Dummy_Expenses];


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
    function resetExpenses() {
        dispatch({ type: 'Reset' });
    }


    const value = {
        expenses: expenseState,
        addExpense,
        deleteExpense,
        updateExpense,
        resetExpenses,
    };

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export default ExpenseContextProvider;