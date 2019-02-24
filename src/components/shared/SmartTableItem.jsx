import React from 'react';
import { Input } from 'reactstrap';

export default class SmartTableItem extends React.Component {
	handleClick = (e) => {
		e.stopPropagation();
	}

	render() {
		const { itemKey, itemValue, isEditing, handleChange } = this.props;

		return (
			<td>
				{isEditing && itemKey !== 'id' &&
					<Input placeholder={itemKey}
						onClick={this.handleClick}
						onChange={handleChange(itemKey)}
						value={itemValue || ''}
					/>
				}
				{!isEditing &&
					<span>
						{itemValue}
					</span>
				}
			</td>
		);
	}
}