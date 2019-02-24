import React from 'react';
import { Table, Button, Input } from 'reactstrap';
import SmartTableRow from './SmartTableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

export default class SmartTable extends React.Component {
	state = {
		addNewItemFields: Object.entries(this.props.data[0])
			.filter(x => x[0] !== 'userID' && x[0] !== 'id')
			.reduce((acc, x) => {
				return {
					...acc,
					[x[0]]: ''
				};
			}, {}),
		sortKey: 'id',
		orderIsAscending: true
	};

	handleFieldUpdate = (field) => (e) => {
		this.setState({
			addNewItemFields: {
				...this.state.addNewItemFields,
				[field]: e.target.value
			}
		});
	}

	addNew = () => {
		this.props.handleCreate(this.state.addNewItemFields);
	}

	sortByKey = (key, collection) => {
		return collection.sort((a, b) => {
			if (key === 'budget' || key === 'amount') {
				return this.state.orderIsAscending
					? b[key] - a[key]
					: a[key] - b[key];
			}

			if (this.state.orderIsAscending) {
				return a[key] < b[key] ? -1 : 1;
			}

			if (!this.state.orderIsAscending) {
				return a[key] < b[key] ? 1 : -1;
			}

			return 0;
		});
	}

	setSortKey = (key) => () => {
		this.setState({
			sortKey: key,
			orderIsAscending: !this.state.orderIsAscending
		});
	}

	transformDate = (timestamp) => {
		if(new Date(timestamp)) {
			return new Date(timestamp).toISOString().split('T')[0];
		}
	};

	immutableMove = (arr, from, to) => {
		return arr.reduce((prev, current, idx, self) => {
			if (from === to) {
				prev.push(current);
			}
			if (idx === from) {
				return prev;
			}
			if (from < to) {
				prev.push(current);
			}
			if (idx === to) {
				prev.push(self[from]);
			}
			if (from > to) {
				prev.push(current);
			}
			return prev;
		}, []);
	}

	render() {
		const { data } = this.props;

		const items = data.map(row =>
			Object.keys(row)
				.filter(key => key !== 'userID')
				.reduce((acc, key) => {
					if (key === 'date') {
						row[key] = this.transformDate(row[key]);
					}
					return {
						...acc,
						[key]: row[key]
					};
				}, {})
		);

		if (items.length === 0) {
			return 'loading...';
		}

		const columnHeadings = Object.keys(items[0]);

		return (
			<div className='smart-table'>
				<Table hover responsive>
					<thead>
						<tr>
							{columnHeadings.map(heading =>
								<th className='text-capitalize' key={heading} onClick={this.setSortKey(heading)}>
									{heading}
									<FontAwesomeIcon icon={this.state.orderIsAscending ? faCaretUp : faCaretDown} />
								</th>)}
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.sortByKey(this.state.sortKey, items).map(item => (
							<SmartTableRow handleUpdateRow={this.props.handleUpdate}
								handleDeleteRow={this.props.handleDelete}
								item={item}
								key={item['id']}
							/>
						))}

						<tr>
							{columnHeadings.map(heading => (
								<td key={heading}>
									{heading !== 'id' &&
										<Input onChange={this.handleFieldUpdate(heading)}/>
									}
								</td>
							))}
							<td></td>
						</tr>

					</tbody>
				</Table>
				<Button className='m-auto d-block' onClick={this.addNew}>
					Add new
				</Button>

			</div>
		);
	}
}