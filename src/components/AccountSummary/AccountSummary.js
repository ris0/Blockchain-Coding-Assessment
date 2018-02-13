import React from 'react';
import PropTypes from 'prop-types';

function Balance({ totalTransactions, balance, totalReceived }) {
  return (
    <div>
      Summary
      <div>{totalTransactions}</div>
      <div>{balance}</div>
      <div>{totalReceived}</div>
    </div>
  )
}

Balance.propTypes = {
  totalTransactions: PropTypes.number.isRequired, 
  balance: PropTypes.number.isRequired,
  totalReceived: PropTypes.number.isRequired 
}

Balance.defaultProps = {
  totalTransactions: 0,
  balance: 0,
  totalReceived: 0
}

export default Balance;