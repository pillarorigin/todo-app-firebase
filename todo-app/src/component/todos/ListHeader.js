import React from 'react';

import './ListHeader.css';

const ListHeader = (props) => {
  return (
    <div className="list-header">
      <h2>{props.title}</h2>
    </div>
  );
};

export default ListHeader;