import React from 'react';
import PropTypes from 'prop-types';

function TransactionSummary({ transactions }) {
    return (
        <div>
            Transactions
            <div>
                {transactions.map((tx) => {
                    return (<span key={tx.hash}> {tx.hash} </span>)
                })}
            </div>
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