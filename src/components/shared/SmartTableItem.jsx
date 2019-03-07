import React from 'react';
import { Input } from 'reactstrap';

export default class SmartTableItem extends React.Component {
	handleClick = (e) => {
		e.stopPropagation();
	}

	getRelationalValue = () => {
		const { itemKey, itemValue, relationalData } = this.props;

		if (!relationalData || relationalData.type !== itemKey) {
			return itemValue;
		}

		const relationalItem = relationalData.items.find(item => item.id === itemValue);
		return relationalItem ? relationalItem.name : itemValue;
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
						{this.getRelationalValue()}
					</span>
				}
			</td>
		);
	}
}