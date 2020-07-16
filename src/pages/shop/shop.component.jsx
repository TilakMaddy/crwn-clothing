import React, { Component } from 'react';
import './shop.styles.scss';

import CollectionPreview from '../../components/collection-preview/collection-preview.components';
import { createStructuredSelector } from 'reselect';
import { selectCollections } from '../../redux/shop/shop.selectors';
import { connect } from 'react-redux';

class ShopPage extends Component {
  render() {
    const { collections } = this.props;
    return (
      <div className="shop-page">
        {
          collections.map(({ id, ...otherProps}) => (
            <CollectionPreview key={ id } {...otherProps} />
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  collections:  selectCollections
})

export default connect(mapStateToProps)(ShopPage);
