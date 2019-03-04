import React from 'react';
import { Table, Button, Input } from 'reactstrap';
import SmartTableRow from './SmartTableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

export default class SmartTable extends React.Component {
	constructor(props) {
		super(props);

		const fields = props.data[0] || [];
		const filteredFields = Object.entries(fields)
			.filter(x => x[0] !== 'userID' && x[0] !== 'id')
			.reduce((acc, x) => {
				return {
					...acc,
					[x[0]]: ''
				};
			}, {});

		this.state = {
			addNewItemFields: filteredFields,
			sortKey: 'id',
			orderIsAscending: true
		};
	}

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

	formatDate = (timestamp) => {
		if(new Date(timestamp)) {
			return new Date(timestamp).toISOString().split('T')[0];
		}
	};

	immutableMove = (arr, from, to) => {
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

	render() {
		const { data } = this.props;

		console.log(this);

		const items = data.map(row =>
			Object.keys(row)
				.filter(key => key !== 'userID')
				.reduce((acc, key) => {
					if (key === 'date') {
						row[key] = this.formatDate(row[key]);
					}
					return {
						...acc,
						[key]: row[key]
					};
				}, {})
		);

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