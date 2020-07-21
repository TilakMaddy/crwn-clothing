import React from 'react';
import './shop.styles.scss';
import { Route } from 'react-router-dom'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollection } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

/**
 * In this case we used a mix of redux state management + pure React JS state
 * we didnt actually pass down mapStateToProps.
 * CollectionsPage and CollectionsOverview page need the collecions to NOT be null
 * in order to render succesfully . Hence we wait to get the data beofre we set the load
 * state to false which eventually renders CollectionsPage and CollectionsOVerview
 */
class ShopPage extends React.Component {

  state = {
    loading: true
  }

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const collectionRef = firestore.collection('collections');
    const { updateCollections } = this.props;

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      updateCollections(convertCollectionsSnapshotToMap(snapshot));
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={ `${match.path}` }
          render={
            (props) =>
              <CollectionsOverviewWithSpinner {...props} isLoading={ this.state.loading } />
          }
        />
        <Route
          path={ `${match.path}/:collectionId` }
          render={
            (props) =>
              <CollectionPageWithSpinner {...props} isLoading={ this.state.loading } />
          }
        />
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollection(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);

