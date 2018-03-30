import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

export default class Topic extends React.Component {
  render() {
    const levels = this.props.path.split('|');
    let summaryPath = [];
    const root = JSON.parse(localStorage.getItem('tree'));
    let currentLevel = root;
    for (let i = 0; i < levels.length; i += 1) {
      if (currentLevel[levels[i]]) {
        summaryPath.push(levels[i]);
        currentLevel = currentLevel[levels[i]];
      } else {
        break;
      }
    }
    summaryPath = summaryPath.join('|');
    let view = 'loading';
    // if not found topic path
    if (!summaryPath) {
      view = <Redirect to="/cms" />;
    } else {
      // found topic path
      let keys = Object.keys(currentLevel).filter(k => k !== 'titleDisplay');
      keys = keys.map(k => {
        const obj = {
          path: `|${k}`,
          name: currentLevel[k].titleDisplay,
        };

        return obj;
      });

      view = (
        <div>
          <h1>{currentLevel.titleDisplay}</h1>
          <ul>
            {keys.map(k => (
              <li key={k.path}>
                <Link to={`/cms/${summaryPath}${k.path}`}>{k.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return view;
  }
}

Topic.propTypes = {
  path: PropTypes.string,
};

Topic.defaultProps = {
  path: '',
};
