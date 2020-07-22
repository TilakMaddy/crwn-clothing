import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionIsFetching } from '../../redux/shop/shop.selectors';
import WithSpinner  from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';
import { compose } from 'redux';

const mapStateToProps = createStructuredSelector({
  isLoading: selectCollectionIsFetching // same prop key name as WithSpinner needs
});


//export const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))

// ! BETTER STYLE OF WRITING THE ABOVE TO ESC FROM DEEP NESTING FUNCTIONS
// ! THAT FUCK WITH READABILITY

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;

