import React from 'react';
import './homepage.styles.scss';

import MenuItem from '../../components/menu-item/menu-item.component';

const HomePage = () => (
  <div className="homepage">
    <div className="directory-menu">
      <MenuItem title="HATS" subtitle="SHOP NOW" />
      <MenuItem title="JACKETS" subtitle="SHOP NOW" />
      <MenuItem title="SNEAKER" subtitle="SHOP NOW" />
      <MenuItem title="WOMENS" subtitle="SHOP NOW" />
      <MenuItem title="MENS" subtitle="SHOP NOW" />
    </div>
  </div>
)

export { HomePage };