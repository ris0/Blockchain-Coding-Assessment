import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { convertTime } from '../../util/helper';

function TransactionItem({ transactions }) {
    return (
        <Fragment>
            {console.log('transactions received', transactions)}
            {transactions.map((tx, idx) => {
                return (
                    <tr key={shortid.generate()}>
                        <td key={shortid.generate()}>{convertTime(tx.time)}</td>
                        <td key={shortid.generate()}>{tx.hash}</td>
                    </tr>
                )
            })}
        </Fragment>
    )
}

TransactionItem.propTypes = {
    transactions: PropTypes.array.isRequired
}

TransactionItem.defaultProps = {
    transactions: []
}

export default TransactionItem;