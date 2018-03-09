import React from 'react';

import mockUsers from './MOCK_DATA.json';

export default class UserList extends React.Component{
	render(){
				
		return (
			<section	className='user-list'> 
				<table>
					<tbody>
						<tr>
							<th>Avatar</th>
							<th>Name</th>
							<th>Role</th>
						</tr>
						{mockUsers.map(function(d,i) {
							return (
							<tr key={i}>
								<td></td>
								<td>{d.name}</td>
								<td>{d.role}</td>
							</tr>
							);
							}
							)
						
						}
							
						
						}
					</tbody>
				</table>				
			</section>
		);
	}
}