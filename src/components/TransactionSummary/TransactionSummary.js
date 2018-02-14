import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import shortid from 'shortid';
import { convertTime, convertToBtc } from '../../util/helper'
 
function TransactionSummary({ transactions }) {
    return (
        <div className="transaction-summary">
            Recent Transactions
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

                <tbody>
                    {transactions.map((tx, idx) => {
                        return (
                            <tr key={shortid.generate()}>
                                <td key={shortid.generate()}>{convertTime(tx.time)}</td>
                                <td key={shortid.generate()}>{tx.hash}</td>
                                <td key={shortid.generate()}>{convertToBtc(tx.result)}</td>
                                <td key={shortid.generate()}>{convertToBtc(tx.balance)}</td>
                            </tr>
                        )
                    })}
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