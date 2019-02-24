import React from 'react';
import { Table, Button, Input } from 'reactstrap';
import SmartTableRow from './SmartTableRow';

export default class SmartTable extends React.Component {
	state = {
		addNewItemFields: Object.entries(this.props.data[0])
			.filter(x => x[0] !== 'userID' && x[0] !== 'id')
			.reduce((acc, x) => {
				return {
					...acc,
					[x[0]]: ''
				};
			}, {})
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

	render() {
		const { data } = this.props;

		const items = data.map(item => {
			return Object.entries(item).filter(x => x[0] !== 'userID');
		});

		if (items.length === 0) {
			return 'loading...';
		}

		return (
			<div className='smart-table'>
				<Table hover responsive>
					<thead>
						<tr>
							{items[0].map(x => <th key={x[0]}>{x[0]}</th>)}
							<th></th>
						</tr>
					</thead>
					<tbody>
						{items.map(item => (
							<SmartTableRow handleUpdateRow={this.props.handleUpdate} item={item} key={`item-${item[1]}`} />
						))}

						<tr>
							{items[0].map(item => (
								<td>
									{item[0] !== 'id' &&
										<Input onChange={this.handleFieldUpdate(item[0])} key={`item-${item[1]}`} />
									}
								</td>
							))}
							<td></td>
						</tr>

					</tbody>
				</Table>
				<Button className='m-auto d-block' onClick={this.addNew}>Add new</Button>

			</div>
		);
	}
}