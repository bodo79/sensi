import React from 'react';
import { TreeNode } from 'react-organizational-chart';

class ViewItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	setChildsView = (item) => {
		console.log('item is', item)

		if (item.values && item.values.length) {
			return (item.values.map(i =>  
				<TreeNode label={<div>{i.name}</div>}> 
						{this.setChildsView(i)}
				  </TreeNode>
			))
		}
	}

	render() {
		const item = this.props.item
		console.log('item is', item)
		if (item.values && item.values.length) {
			return (item.values.map(i =>  
				<TreeNode label={<div>{i.name}</div>}> 
						{this.setChildsView(i)}
				  </TreeNode>
			))
		}
	}
}

export default ViewItem