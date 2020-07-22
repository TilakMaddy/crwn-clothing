import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from '../../pages/collection/collection.component';

const mapStateToProps = createStructuredSelector({
  isLoading: !selectIsCollectionsLoaded,
})

export default compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);