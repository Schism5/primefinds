import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
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
            <form style={{margin:'20px 0 0 20px'}} encType="multipart/form-data" method="post" action="/manifests">
                <label htmlFor="avatar">Select Manifest</label>

                <input 
                    style={{marginLeft:'15px'}}
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept=".csv, .xlsx" 
                    onChange={(e) => console.log(e.target.files)}
                />
                <div style={{marginTop:'10px'}}>
                    <input type="submit" value="Submit" id="submit" />
                </div>
            </form>
        );
    }
}

export default UploadCsv;