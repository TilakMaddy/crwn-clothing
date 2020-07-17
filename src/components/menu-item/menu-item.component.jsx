import React from 'react';
import './menu-item.styles.scss';

import { withRouter } from 'react-router-dom';

// exportig withRouter gives access to history prop which otherwise eists only
// on the component which <Route component={sample}> rnders , doesnt get pased to children
// You could manually drill down the props but that would unnecessarily make many
// components carry props tho they dont have any use with it

const MenuItem = ({ title, imageUrl, size, history, location, match, linkUrl }) => (

  <div className={`menu-item ${size}`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <div style={{
      backgroundImage: `url(${imageUrl})`
    }} className="background-image">
    </div>
    <div className="content">
      <h1 className="title"> { title.toUpperCase() } </h1>
      <span className="subtitle"> SHOP NOW </span>
    </div>
  </div>

)

export default withRouter(MenuItem);

