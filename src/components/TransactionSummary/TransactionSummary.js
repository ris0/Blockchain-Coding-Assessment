import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Table, Label } from 'react-bootstrap';
import TransactionItem from '../TransactionItem/TransactionItem';

function TransactionSummary({transactions}) {

    return (
        <div className="transaction-summary">
            <Label bsStyle="default">Recent Transactions</Label>
            <Table
                bordered={true}
                responsive
            >
                <thead>
                    <tr>
                        <th>Time Stamp</th>
                        <th>Tx Hash</th>
                        <th>Amount</th>
                        <th>Balance</th>
                    </tr>
                </thead>

                <tbody id="tbl-body">
                    {console.log(this)}
                    <TransactionItem transactions={this.props.transactions} />
                </tbody>
            </Table>
        </div>
    )
}

TransactionSummary.propTypes = {
    transactions: PropTypes.array.isRequired
}

TransactionSummary.defaultProps = {
    transactions: []
}

export default TransactionSummary;