import React from 'react';
import { Table, Button, Input, Alert } from 'reactstrap';
import SmartTableRow from './SmartTableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { formatDate, sortByKey  } from '../../core/helpers.js';

export default class SmartTable extends React.Component {
	state = {
		addNewItemFields: {},
		sortKey: 'id',
		isOrderAscending: true
	};

	componentDidUpdate() {
		// if(hasError: false)
	}

	onErrorDismiss = () => {
		this.props.handleErrorDismiss();
	}

	handleFieldUpdate = (field) => (e) => {
		console.log('field update:', field, e.target.value);
		this.setState({
			addNewItemFields: {
				...this.state.addNewItemFields,
				[field]: e.target.value
			}
		});
	}

	addNew = () => {
		this.setState({addNewItemFields: {}});
		this.props.handleCreate(this.state.addNewItemFields);
	}

	setSortKey = (key) => () => {
		this.setState({
			sortKey: key,
			isOrderAscending: !this.state.isOrderAscending
		});
	}

	render() {
		const { data, relationalData } = this.props;
		const { isOrderAscending } = this.state;

		const filteredFields = data.fields && data.fields
			.filter(key => key !== 'userID') || [];

		const items = data.items.map(row =>
			row && Object.keys(row)
				.filter(key => key !== 'userID')
				.reduce((acc, key) => {
					if (key === 'date') {
						row[key] = formatDate(row[key]);
					}
					return {
						...acc,
						[key]: row[key]
					};
				}, {})
		);

		return (
			<div className='smart-table'>
				<Table hover responsive>
					<thead>
						<tr>
							{filteredFields.map(field =>
								<th className='text-capitalize' key={field} onClick={this.setSortKey(field)}>
									{field}
									<FontAwesomeIcon icon={isOrderAscending ? faCaretUp : faCaretDown} />
								</th>)}
							<th></th>
						</tr>
					</thead>
					<tbody>
						{sortByKey(this.state.sortKey, items, isOrderAscending).map(item => (
							<SmartTableRow
								handleUpdateRow={this.props.handleUpdate}
								handleDeleteRow={this.props.handleDelete}
								item={item}
								key={item['id']}
								relationalData={relationalData}
							/>
						))}

						<tr>
							{filteredFields.map(field => (
								<td key={field}>
									{field !== 'id' && (relationalData && relationalData.type !== field) &&
										<Input value={this.state.addNewItemFields[field] || ''} onChange={this.handleFieldUpdate(field)}/>
									}

									{field !== 'id' && (relationalData && relationalData.type === field) &&
										<Input placeholder={field}
											type='select'
											onClick={this.handleClick}
											onChange={this.handleFieldUpdate(field)}
											value={this.state.addNewItemFields[field]}
										>
											<option>Pick one</option>
											{relationalData.items.map(item =>
												<option key={item.id} value={item.id}>{item.name}</option>
											)}
										</Input>
									}
								</td>
							))}
							<td></td>
						</tr>

					</tbody>
				</Table>
				<Alert color='danger' isOpen={data.error} toggle={this.onErrorDismiss}>
					{data.error && data.error.message}
				</Alert>
				<Button className='m-auto d-block' onClick={this.addNew}>
					Add new
				</Button>
				{data.items.length === 0 &&
					<div>
						No items
					</div>
				}

			</div>
		);
	}
}