import React from 'react';
import { Button } from 'reactstrap';
import SmartTableItem from './SmartTableItem';

export default class SmartTableRow extends React.Component {
	state = {
		isEditing: false,
		fields: Object.keys(this.props.item).reduce((acc, key) => ({
			...acc,
			[key]: this.props.item[key]
		}), {})
	}

	toggleItemEditing = () => {
		this.setState({
			isEditing: !this.state.isEditing
		});
	}

	saveEdit = (e) => {
		e.stopPropagation();
		this.props.handleUpdateRow(this.state.fields);
	}

	handleFieldUpdate = (field) => (e) => {
		this.setState({
			fields: {
				...this.state.fields,
				[field]: e.target.value
			}
		});
	}

	deleteItem = (e) => {
		e.stopPropagation();
		this.props.handleDeleteRow(this.state.fields.id);
	}

	render() {
		const { isEditing, fields } = this.state;

		return (
			<tr onClick={this.toggleItemEditing}>

				{Object.keys(fields).map(key => (
					<SmartTableItem handleChange={this.handleFieldUpdate}
						key={key}
						isEditing={isEditing}
						itemValue={fields[key]}
						itemKey={key}
						relationalData={this.props.relationalData}
					/>
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