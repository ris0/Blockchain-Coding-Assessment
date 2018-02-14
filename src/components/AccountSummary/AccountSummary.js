import React from 'react';
import PropTypes from 'prop-types';
import { Table, Label } from 'react-bootstrap';

function AccountSummary({ address, totalReceived, totalSent, balance, totalTransactions }) {
  return (
    <div className="summary">
      <Label bsStyle="default">Account Summary</Label>
      <Table
        bordered={true}
        condensed={true}
        responsive
      >
        <tbody>
          <tr>
            <td>Address: </td>
            <td>{address}</td>
          </tr>
          <tr>
            <td>Total Received: </td>
            <td>{totalReceived}</td>
          </tr>
          <tr>
            <td>Total Sent:</td>
            <td>{totalSent}</td>
          </tr>
          <tr>
            <td>Final Balance:</td>
            <td>{balance}</td>
          </tr>
          <tr>
            <td>Total Transactions:</td>
            <td>{totalTransactions}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

AccountSummary.propTypes = {
  address: PropTypes.string.isRequired,
  totalReceived: PropTypes.number.isRequired,
  totalSent: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  totalTransactions: PropTypes.number.isRequired
}

AccountSummary.defaultProps = {
  address: '',
  totalReceived: 0,
  totalSent: 0,
  balance: 0,
  totalTransactions: 0,
}

export default AccountSummary;