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

export function formatDate(timestamp) {
	if(new Date(timestamp)) {
		return new Date(timestamp).toISOString().split('T')[0];
	}
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