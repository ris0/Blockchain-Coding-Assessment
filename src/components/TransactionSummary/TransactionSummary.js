import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Label } from 'react-bootstrap';
import TransactionItem from '../TransactionItem/TransactionItem';

class TransactionSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            test: false
        }
    }

    componentDidMount() {
        console.log('componentdidmount');
        this.setState({ test: false });
        this.testWebSocket();
    }

    invokeTestFunc = () => {
        // console.log('message received')
        this.setState({ test: true })
    }

    // componentDidUpdate() {
    //     console.log('component has been updated');

    // }

    bar = () => {
        var fakeTx = []
        var tx = {
            time: 123,
            hash: 'abc123',
            result: 'great success',
            balance: 9999
        }
        fakeTx.push(tx);

        // return (
        //     <tbody>
        //         <TransactionItem transactions={fakeTx} />
        //     </tbody>


        // )

    }

    testWebSocket() {
        var websocket = new WebSocket("ws://ws.blockchain.info/inv");
        websocket.onopen = (evt) => {
            console.log('Connection open', evt);
            var msg1 = {
                op: "unconfirmed_sub"
            }

            // subscribing to an address
            var msg2 = {
                "op": "addr_sub",
                "addr": "1H6ZZpRmMnrw8ytepV3BYwMjYYnEkWDqVP"
            }
            websocket.send(JSON.stringify(msg1));
        }
        websocket.onclose = function (evt) { console.log('Connection closed') };
        websocket.onmessage = (evt) => {
            // console.log('Message received', evt)
            this.invokeTestFunc();
        };
        websocket.onerror = function (evt) { console.log('Error occurred', evt) };
    }

    render() {
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

                    {/* {this.state.test ? this.bar() : null} */}

                    <tbody>
                        <TransactionItem transactions={this.props.transactions} />
                    </tbody>
                    

                </Table>
            </div>
        )
    }
}

// function testWebSocket() {
//     var websocket = new WebSocket("ws://ws.blockchain.info/inv");
//     websocket.onopen = (evt) => {
//         console.log('Connection open', evt);
//         var msg1 = {
//             op: "unconfirmed_sub"
//         }

//         // subscribing to an address
//         var msg2 = {
//             "op": "addr_sub",
//             "addr": "1H6ZZpRmMnrw8ytepV3BYwMjYYnEkWDqVP"
//         }

//         // this was the issue .. need to stringify that
//         // websocket.send(JSON.stringify(msg1)); 
//         websocket.send(JSON.stringify(msg2));

//         // now how do i handle the management of these connections

//         // im thinking that i might need to convert this into a class
//         // are there any other reasons to use class other than the usage of refs or state?

//         // TransactionSummary
//         // if new message - create new transaction item... something like that
//         // TransactionItem
//     }
//     websocket.onclose = function (evt) { console.log('Connection closed') };
//     websocket.onmessage = (evt) => { console.log('Message received', evt) };
//     websocket.onerror = function (evt) { console.log('Error occurred', evt) };
// }

// // const addr = '17CUX3NGq2EeLwjXHAU95y3TjoRRvBmrbR'
// function TransactionSummary({ transactions }) {
//     return (
//         <div className="transaction-summary">
//             <Label bsStyle="default">Recent Transactions</Label>
//             <Table
//                 bordered={true}
//                 responsive
//             >
//                 <thead>
//                     <tr>
//                         <th>Time Stamp</th>
//                         <th>Tx Hash</th>
//                         <th>Amount</th>
//                         <th>Balance</th>
//                     </tr>
//                 </thead>
//                 <TransactionItem transactions={transactions} />
//             </Table>
//         </div>
//     )
// }

TransactionSummary.propTypes = {
    transactions: PropTypes.array.isRequired
}

TransactionSummary.defaultProps = {
    transactions: []
}

export default TransactionSummary;