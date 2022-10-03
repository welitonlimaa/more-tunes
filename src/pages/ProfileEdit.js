import React from 'react';
import PropTypes from 'prop-types';

class ProfileEdit extends React.Component {
  render() {
    const { compHeader } = this.props;
    return (
      <div data-testid="page-profile-edit">
        { compHeader }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  compHeader: PropTypes.element.isRequired,
};

export default ProfileEdit;
