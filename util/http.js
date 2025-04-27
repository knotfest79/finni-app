import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../Firebase/FirebaseConfig';

const expensesCollection = collection(firestore, 'expenses');

export async function storeExpense(expenseData) {
    try {
        const docRef = await addDoc(expensesCollection, expenseData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
}

export async function fetchExpenses() {
    try {
        const querySnapshot = await getDocs(expensesCollection);
        const expenses = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                amount: data.amount,
                date: new Date(data.date),
                description: data.description,
            };
        });
        return expenses;
    } catch (error) {
        console.error("Error getting documents: ", error);
        throw error;
    }
}

export async function updateExpense(id, expenseData) {
    try {
        const expenseDocRef = doc(firestore, 'expenses', id);
        await updateDoc(expenseDocRef, expenseData);
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
}

export async function deleteExpense(id) {
    try {
        const expenseDocRef = doc(firestore, 'expenses', id);
        await deleteDoc(expenseDocRef);
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw error;
    }
}