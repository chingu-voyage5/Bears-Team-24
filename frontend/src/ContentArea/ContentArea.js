import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import marked from 'marked';

export default class ContentArea extends React.Component {
  componentWillMount() {}

  render() {
    const { path } = this.props;
    let view = 'none';
    const id = JSON.parse(localStorage.getItem('pathTable'))[path] || '';
    const articles = JSON.parse(localStorage.getItem('allArticles'));
    if (id) {
      // exists id for that path
      const index = JSON.parse(localStorage.getItem('articleIndex'));
      const options = { __html: marked(articles[index[id]].content) };

      view = <div dangerouslySetInnerHTML={options} />;
    } else if (path) {
      // illegal path - id not found
      const levels = path.split('|');
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
      if (!summaryPath) {
        view = <Redirect to="/cms" />;
      } else {
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
    } else {
      // no additional path - we are at /cms page
      const root = JSON.parse(localStorage.getItem('tree'));

      let keys = Object.keys(root).filter(k => k !== 'titleDisplay');
      keys = keys.map(k => {
        const obj = {
          path: k,
          name: root[k].titleDisplay,
        };

        return obj;
      });

      view = (
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

    return (
      <div>
        <section className="content-area">{view}</section>
      </div>
    );
  }
}

ContentArea.propTypes = {
  path: PropTypes.string,
};

ContentArea.defaultProps = {
  path: '',
};
