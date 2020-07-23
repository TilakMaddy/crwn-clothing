import React from 'react';
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionPageContainer from '../collection/collection.container';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';

// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  //*The reason you don't fetch api in the constructor is becoz the constructor
  //* will called multiple times during render unlike componentDidMount()

  /*UNSAFE_componentWillMount() {
    This function is not recommened after v16 coz it may be called more than once
  }*/

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={ `${match.path}` }
          component={ CollectionsOverviewContainer }
        />
        <Route
          path={ `${match.path}/:collectionId` }
          component={ CollectionPageContainer }

        />
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
