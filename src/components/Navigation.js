import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if(isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('edit')} className='f3 link dim black underline pa3 pointer'>Edit</p>
				<p onClick={() => onRouteChange('view')} className='f3 link dim black underline pa3 pointer'>View</p>
			</nav>	
			)
	} 
}

export default Navigation