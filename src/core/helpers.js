import moment from 'moment';

export function immutableMove(arr, from, to) {
	return arr.reduce((acc, current, idx, self) => {
		if (from === to) {
			acc.push(current);
		}
		if (idx === from) {
			return acc;
		}
		if (from < to) {
			acc.push(current);
		}
		if (idx === to) {
			acc.push(self[from]);
		}
		if (from > to) {
			acc.push(current);
		}
		return acc;
	}, []);
}

export function formatDate(utcTimestamp) {
	return moment(utcTimestamp).format('YYYY-MM-DD');
}

export function sortByKey(key, collection, isOrderAscending) {
	return collection.sort((a, b) => {
		if (key === 'budget' || key === 'amount') {
			return isOrderAscending
				? b[key] - a[key]
				: a[key] - b[key];
		}

		if (isOrderAscending) {
			return a[key] < b[key] ? -1 : 1;
		}

		if (!isOrderAscending) {
			return a[key] < b[key] ? 1 : -1;
		}

		return 0;
	});
}

export function handleResponse(response) {

	if(!response.ok) {
		return response.json().then(err => {
			const errorData = {
				status: response.status,
				statusText: response.statusText,
				...err
			};

			throw errorData;
		});
	}
	return response.json();
}