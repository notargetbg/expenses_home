import React from 'react';
import { Button } from 'reactstrap';
import SmartTableItem from './SmartTableItem';

export default class SmartTableRow extends React.Component {
	state = {
		isEditing: false,
		fields: this.props.item.reduce((acc, x) => {
			return {
				...acc,
				[x[0]]: x[1]
			};
		}, {})
	}

	toggleItemEditing = () => {
		this.setState({
			isEditing:  !this.state.isEditing
		});
	}

	saveEdit = () => {
		// 1. check
		this.props.handleUpdateRow(this.state.fields);
		// 2. dispatch to redux
		// 3. clear local state
	}

	handleFieldUpdate = (field) => (e) => {
		this.setState({
			fields: {
				...this.state.fields,
				[field]: e.target.value
			}
		});
	}

	render() {
		const { isEditing, fields } = this.state;

		return (
			<tr onClick={this.toggleItemEditing} >

				{Object.entries(fields).map(entry => (
					<SmartTableItem handleChange={this.handleFieldUpdate} key={`item-${entry[0]}`} isEditing={isEditing} item={entry} />
				))}

				{isEditing &&
					<td>
						<Button size='sm' onClick={this.saveEdit}>Save</Button>
					</td>
				}

				{!isEditing &&
					<td>
						<Button size='sm remove-btn' onClick={this.deleteItem} className='btn-danger'>
							X
						</Button>
					</td>
				}

			</tr>
		);
	}
}