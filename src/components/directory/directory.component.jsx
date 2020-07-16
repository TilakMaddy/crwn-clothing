import React, { Component } from 'react';
import './directory.styles.scss';

import MenuItem from '../menu-item/menu-item.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';


// TODO convert this to a functional component we no longer store states in here
class Directory extends Component {
  render() {
    return (
      <div className="directory-menu">
        {
          this.props.sections.map(({ id, ...otherProps }) => (
            <MenuItem key={ id } {...otherProps} />
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
