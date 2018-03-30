import React from 'react';
import { Link } from 'react-router-dom';

export default class Root extends React.Component{
	render(){
const root = JSON.parse(localStorage.getItem('tree'));

      let keys = Object.keys(root).filter(k => k !== 'titleDisplay');
      keys = keys.map(k => {
        const obj = {
          path: k,
          name: root[k].titleDisplay,
        };

        return obj;
      });

      return (
        <div>
          <h1>Index</h1>
          <ul>
            {keys.map(k => (
              <li key={k.path}>
                <Link to={`/cms/${k.path}`}>{k.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      );
      }
   }