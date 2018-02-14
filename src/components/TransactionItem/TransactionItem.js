import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Label } from 'react-bootstrap';
import shortid from 'shortid';
import { convertTime, convertToBtc } from '../../util/helper';

function TransactionItem({ transactions }) {
    return (
        <Fragment>
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