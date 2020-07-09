import React from 'react';
import './menu-item.styles.scss';

const MenuItem = (props) => (

  <div className="menu-item">
    <div className="content">
      <h1 className="title"> { props.title } </h1>
      <span className="subtitle"> { props.subtitle } </span>
    </div>
  </div>

)

export default MenuItem;