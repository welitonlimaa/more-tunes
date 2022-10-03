import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  render() {
    const { compHeader } = this.props;
    return (
      <div data-testid="page-profile">
        { compHeader }
      </div>
    );
  }
}

Profile.propTypes = {
  compHeader: PropTypes.element.isRequired,
};

export default Profile;
