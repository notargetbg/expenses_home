import React from 'react';
import { Table, Button, Input } from 'reactstrap';
import SmartTableRow from './SmartTableRow';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

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

	transformDate = (item) => {
		if (item[0] === 'date') {
			item[1] = new Date(item[1]).toISOString().split('T')[0];
		}
	};

	sortByKey = (key, collection) => {
		return collection.sort((a, b) => {
			if (this.state.orderIsAscending) {
				return this.getByKey(key, a) < this.getByKey(key, b) ? -1 : 1;
			}

			if (!this.state.orderIsAscending) {
				return this.getByKey(key, a) < this.getByKey(key, b) ? 1 : -1;
			}

			return 0;
		});
	}

	getByKey = (key, collection) => {
		return collection.find(x => x[0] === key)[1];
	}

	setSortKey = (key) => () => {
		this.setState({
			sortKey: key,
			orderIsAscending: !this.state.orderIsAscending
		});
	}

	render() {

		const { data } = this.props;

		const items = data.map(item => {
			return Object.entries(item).filter(x => {
				this.transformDate(x);
				return x[0] !== 'userID';
			});
		});

		if (items.length === 0) {
			return 'loading...';
		}

		return (
			<div className='smart-table'>
				<Table hover responsive>
					<thead>
						<tr>
							{items[0].map(x =>
								<th className='text-capitalize' key={x[0]} onClick={this.setSortKey(x[0])}>
									{x[0]}
									{/* <FontAwesomeIcon icon={this.state.orderIsAscending ? faCaretUp : faCaretDown} /> */}
								</th>)}
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.sortByKey(this.state.sortKey, items).map((item) => (
							<SmartTableRow handleUpdateRow={this.props.handleUpdate}
								handleDeleteRow={this.props.handleDelete}
								item={item}
								key={`table-row-${item.find(x => x[0] === 'id')[1]}`}
							/>
						))}

						<tr>
							{items[0].map(item => (
								<td key={`item-${item[0]}`}>
									{item[0] !== 'id' &&
										<Input onChange={this.handleFieldUpdate(item[0])}
											key={`item-${item[1]}`}
										/>
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