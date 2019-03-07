import React from 'react';
import { Table, Button, Input } from 'reactstrap';
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

	handleFieldUpdate = (field) => (e) => {
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
		const { data } = this.props;
		const { isOrderAscending } = this.state;

		const filteredFields = data.fields && data.fields
			.filter(key => key !== 'userID') || [];

		const items = data.items.map(row =>
			Object.keys(row)
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
								relationalData={this.props.relationalData}
							/>
						))}

						<tr>
							{filteredFields.map(field => (
								<td key={field}>
									{field !== 'id' &&
										<Input value={this.state.addNewItemFields[field] || ''} onChange={this.handleFieldUpdate(field)}/>
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
				{data.items.length === 0 &&
					<div>
						No items
					</div>
				}

			</div>
		);
	}
}