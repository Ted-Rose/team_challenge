import React from 'react';

class WindowObjects extends React.Component {
  renderWindowObjects() {
    const windowObjects = Object.keys(window);

    return windowObjects.map((objectName) => {
      if (objectName === 'window') {
        return null; // Exclude the 'window' property
      }

      return (
        <div key={objectName}>
          <h2>{objectName}</h2>
          <pre>{JSON.stringify(window[objectName], getCircularReplacer(), 2)}</pre>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderWindowObjects()}
      </div>
    );
  }
}

function getCircularReplacer() {
  const seen = new WeakSet();

  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return; // Exclude circular references
      }
      seen.add(value);
    }

    return value;
  };
}

export default WindowObjects;