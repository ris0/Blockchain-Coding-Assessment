import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
    render() {
        return (
            <div>
                <input ref="input" type="text" placeholder="Enter account address..." />
                <button onClick={this.props.searchAddress}> Submit </button>
            </div>
        )
    }
}

SearchBar.propTypes = {
  searchAddress: PropTypes.func.isRequired
}

SearchBar.defaultProps = {
  searchAddress: () => {}
}

export default SearchBar;