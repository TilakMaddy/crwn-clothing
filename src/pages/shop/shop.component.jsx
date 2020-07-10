import React, { Component } from 'react';
import SHOP_DATA from './shop.data';
import './shop.styles.scss';

import CollectionPreview from '../../components/collection-preview/collection-preview.components';

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectios: SHOP_DATA,
    }
  }
  render() {
    const { collectios } = this.state;
    return (
      <div className="shop-page">
        {
          collectios.map(({ id, ...otherProps}) => (
            <CollectionPreview key={ id } {...otherProps} />
          ))
        }
      </div>
    );
  }
}

export default ShopPage;
