import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

class UploadCsv extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <form enctype="multipart/form-data" method="post" action="http://localhost:8080/upload/lol">
                <label htmlFor="avatar">Choose manifest:</label>

                <input 
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept=".csv, .xlsx" 
                    onChange={(e) => console.log(e.target.files)}
                />
                <input type="submit" value="submit" id="submit" />
            </form>
        );
    }
}

export default UploadCsv;