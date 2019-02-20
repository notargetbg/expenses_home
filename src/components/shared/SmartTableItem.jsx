import React from 'react';
import { Input } from 'reactstrap';

export default class SmartTableItem extends React.Component {
	handleClick = (e) => {
		e.stopPropagation();
	}

	render() {
		const { item, isEditing, handleChange } = this.props;
		const itemKey = item[0];
		const itemValue = item[1] || '';

		return (
			<td>
				{isEditing && itemKey !== 'id' &&
					<Input placeholder={item[0]} onClick={this.handleClick} onChange={handleChange(itemKey)} value={itemValue} />
				}
				{!isEditing &&
					<span>
						{item[1]}
					</span>
				}
			</td>
		);
	}
};