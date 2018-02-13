import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class SearchBar extends Component {
    render() {
        return (
            <div className="search-bar">
                <input ref="input" type="text" placeholder="Enter account address..." />
                <Button 
                    bsStyle="primary"
                    bsSize="small"
                    block
                    onClick={this.props.searchAddress}> 
                    Submit
                </Button>
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