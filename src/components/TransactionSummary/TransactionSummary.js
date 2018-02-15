import React from 'react';
import PropTypes from 'prop-types';
import { Table, Label } from 'react-bootstrap';
import TransactionItem from '../TransactionItem/TransactionItem';

function TransactionSummary({ transactions }) {
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
                    </tr>
                </thead>
                <tbody id="tbl-body">
                    <TransactionItem transactions={transactions} />
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