import { createSelector } from 'reselect';


const incomeItemsSelector = state => state.income.items;
const expensesItemsSelector = state => state.expenses.items;

export const budgetSelector = createSelector(
	incomeItemsSelector,
	expensesItemsSelector,
	(incomeItems, expensesItems) => {
		const income = incomeItems.reduce((acc, item) => acc += parseInt(item.amount), 0);
		const expenses = expensesItems.reduce((acc, item) => acc += parseInt(item.amount), 0);

		return {
			income,
			expenses,
			total: income - expenses
		};
	}
);