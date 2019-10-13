import { createStore } from 'redux';
import Reducers from '../redux/reducers/reducer';

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

mapStateToProps = state => {
    return {
        newUser: state.newUser
    }
}

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306', 
    user: 'root',
    password: 'sametcl2',
    database: 'NerdesinGardasimDB'
});

connection.connect();

connection.query(`INSERT INTO NerdesinGardasimDB.users VALUES (${newUser.email, newUser.password, newUser.fullName})`);

connection.end();