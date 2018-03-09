import React from 'react';

import mockUsers from './MOCK_DATA.json';

export default class UserPage extends React.Component{
			
	render(){
		
		let ids = mockUsers.map(a=> a._id);
		let number = ids.indexOf(this.props.userId);
		
		let userInfo = (
		<p>User ID {this.props.userId} not found. Type '/users' in address bar and hit Enter to see all registered users</p>
		)		
		;
		
		if(number != -1){
			let d = mockUsers[number];			
			
			userInfo = (
				<table>
				<tr>
					<td class="avatar" colspan='2'>
						<img src={d.avatar} alt="avatar" />
					</td>
				</tr>
				<tr>
					<td> Name
					</td>
					<td> {d.name}
					</td>
				</tr>
				<tr>
					<td> ID
					</td>
					<td> {d._id}
					</td>
				</tr>
				<tr>
					<td> Email
					</td>
					<td> {d.email}
					</td>
				</tr>
				<tr>
					<td> Role
					</td>
					<td> {d.role}
					</td>
				</tr>
				<tr>
					<td> Avatar
					</td>
					<td> {d.avatar}
					</td>
				</tr>
				<tr>
					<td> Bio
					</td>
					<td> {d.bio}
					</td>
				</tr>
				
				</table>				
				
			);
		}		
				
						
		return (
			<section	className='user-page'> 
				{userInfo}
			</section>
		);
	}
}