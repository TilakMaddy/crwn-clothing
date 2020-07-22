import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from '../../pages/collection/collection.component';

const mapStateToProps = state => ({
  isLoading: !selectIsCollectionsLoaded(state),
})

// CollectionPage container

export default compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

