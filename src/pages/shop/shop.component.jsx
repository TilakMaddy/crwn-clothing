import React from 'react';
import './shop.styles.scss';
import { Route } from 'react-router-dom'
import CollectionPage from '../collection/collection.component';
import { connect } from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { selectCollectionIsFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { createStructuredSelector } from 'reselect';
import { CollectionsOverviewContainer } from '../../components/collections-overview/collections-overview.container';

const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  //*The reason you don't fetch api in the constructor is becoz the constructor
  //* will called multiple times during render unlike componentDidMount()

  /*UNSAFE_componentWillMount() {
    This function is not recommened after v16 coz it may be called more than once
  }*/

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, /*isFetching*/ isCollectionsLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={ `${match.path}` }
          // render={
          //   (props) =>
          //     <CollectionsOverviewWithSpinner {...props} isLoading={ isFetching } />
          // }
          component={ CollectionsOverviewContainer }
        />
        <Route
          path={ `${match.path}/:collectionId` }
          render={
            (props) =>
              <CollectionPageWithSpinner {...props} isLoading={ !isCollectionsLoaded } />
          }
        />
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  isFetching: selectCollectionIsFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});


const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
  // even though fetchCollectionsStartAsync() returns a function and not an
  // action object we are able to do this because of redux-think
  // redux-thunk will detect this and call the function that it returns and
  // passes the first argument as `dispatch`
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

