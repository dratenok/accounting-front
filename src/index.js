import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {TransactionVM} from "./model/transactionVM";
import HttpService from "./service/HttpService";


class TableNotebook extends React.Component {
    state = {
        transactions: [],
        balance: 0,
        type: '',
        accountBalance: 0
    };

    componentDidMount() {
        HttpService.get('transactions')
            .then(
                (res) => this.setState({transactions: res.map(transaction => TransactionVM.setObject(transaction))}),
                console.error
            ).then(this.setBalance);
    }

    setBalance = () => {
        HttpService.get('balance')
            .then(
                (res) => this.setState({accountBalance: res}),
                console.error
            );
    };

    handleBalanceChange = (e) => {
        this.setState({balance: e.target.value});
    };

    handleTypeChange = (event) => {
        this.setState({type: event.target.value});
    };

    handleAddTransaction = () => {
        const {balance, type} = this.state;
        const transaction = new TransactionVM(null, balance, type);

        HttpService.post('transactions', transaction)
            .then(
                (res) => {
                    this.setState({transactions: [...this.state.transactions, TransactionVM.setObject(res)]});
                },
                console.error
            ).then(this.setBalance);
    };

    render() {
        return (
            <>
                <h1>Your balance is: {this.state.accountBalance}</h1>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <FormControl className="select">
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            value={this.state.type}
                                            onChange={this.handleTypeChange}
                                        >
                                            <MenuItem value={"DEBIT"}>DEBIT</MenuItem>
                                            <MenuItem value={"CREDIT"}>CREDIT</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <TextField value={this.state.balance} onChange={this.handleBalanceChange}
                                               fullWidth
                                               type="number"
                                               label="Next transaction"/>
                                </TableCell>
                                <TableCell>
                                    <Button size="small" onClick={this.handleAddTransaction}>
                                        Add
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.transactions.map((row) => (
                                <TableRow key={row.id} className={row.type === "CREDIT" ? "credit" : "debit"}>
                                    <TableCell component="th" scope="row">
                                        {row.type}
                                    </TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }
}

ReactDOM.render(
    <TableNotebook/>,
    document.getElementById('root')
);

