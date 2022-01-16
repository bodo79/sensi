import React from 'react';

class ListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onEdit: false,
			children: null,
		}
	}

	handleEdit = (event) => {
		if (event.target.id !== '1') {
			this.setState({onEdit: true});
		} else {
			console.log('Can\'t edit the CEO')
		}
	  }
	
	clickDelete = (event) => {
		if (event.target.id !== '1') {
			this.props.onHandleDelete(event.target.id)
		} else {
			console.log('Can\'t delete the CEO')
		}
	}

	clickSave = (event) => {
		if (this.state.Add) {
			this.props.onHandleSave(event.target.id, this.state.inputtxt, true)
			this.setState({Add: false, inputtxt: ''})
		} else {
			this.props.onHandleSave(event.target.id, this.state.inputtxt, false)
			this.setState({inputtxt: ''})
		}
		this.setState({onEdit: false})
	}
	
	clickAdd = (event) => {
		this.setState({onEdit: true, Add: true})
	}

	// validate that only letters are writen
	onInputChange = (event) => {
		this.setState({inputtxt: event.target.value.replace(/[^a-zA-Z ]/ig,'')});
	}

	handleCancel = (event) => {
		this.setState({onEdit: false, inputtxt: ''})
	}

	render() {
		const item = this.props.item
		if (this.state.onEdit) {
			return (
				<li> 
				  {item.name} {<input
										className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white"
										type="text"
										name="name"
										value = {this.state.inputtxt}
										placeholder="Enter name and role"
										id="name"
										onChange={ this.onInputChange }
										/>} {<button id={item.id} type="button" onClick={this.clickSave}> Save </button>} {<button id="cancel" type="button" onClick={this.handleCancel}> Cancel </button>}
				   <ul>
					  {item.values && item.values.map(i => (<ListItem 
                                    item={i} 
                                    key={i.id} 
									view={this.props.view}
                                    onHandleDelete={this.props.onHandleDelete}
                                    onHandleSave={this.props.onHandleSave}
                                    />))}
									</ul>
				</li>
			  );
		} else {
			if (item.id !== 1) {
				return (
					<li> 
					  {item.name} {<button id={item.id} type="button" onClick={this.handleEdit}> Edit </button> } {<button id={item.id} type="button" onClick={this.clickDelete}> Delete </button>} {<button id={item.id} type="button" onClick={this.clickAdd}> Add </button>}
					  <ul>
					  {item.values && item.values.map(i => (<ListItem 
                                    item={i} 
                                    key={i.id} 
									view={this.props.view}
                                    onHandleDelete={this.props.onHandleDelete}
                                    onHandleSave={this.props.onHandleSave}
                                    />))}
									</ul>
					</li>
				  );
			} else {
				return (
					<li> 
					  {item.name} {<button id={item.id} type="button" onClick={this.clickAdd}> Add </button>}
					   <ul>
					  {item.values && item.values.map(i => (<ListItem 
                                    item={i} 
                                    key={i.id} 
									view={this.props.view}
                                    onHandleDelete={this.props.onHandleDelete}
                                    onHandleSave={this.props.onHandleSave}
                                    />))}
									</ul>
					</li>
				  );
			}
		}
	}
}

export default ListItem