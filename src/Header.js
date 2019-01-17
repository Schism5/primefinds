import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import PieChartIcon from '@material-ui/icons/PieChart';
import HistoryIcon from '@material-ui/icons/History';
import { Divider } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import axios from 'axios';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            modalOpen: false,
            modalText: ''
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.copyEmails = this.copyEmails.bind(this);
    }

    render() {
        const sideList = (
            <div >
                <List>
                    <ListItem button key="Bills" onClick={() => {this.props.setPage('Payments')}}>
                        <ListItemIcon><PieChartIcon /></ListItemIcon>
                        <ListItemText primary="Bills"/>
                    </ListItem>
                    <ListItem button key="Sales" onClick={() => {this.props.setPage('Sales')}}>
                        <ListItemIcon><MoneyIcon /></ListItemIcon>
                        <ListItemText primary="Sales"/>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key="BillsHistory" onClick={() => {this.props.setPage('BillsHistory')}}>
                        <ListItemIcon><HistoryIcon /></ListItemIcon>
                        <ListItemText primary="Bills History"/>
                    </ListItem>
                    <ListItem button key="CSV" onClick={() => {this.props.setPage('CSV')}}>
                        <ListItemIcon><HistoryIcon /></ListItemIcon>
                        <ListItemText primary="CSV"/>
                    </ListItem>
                </List>
            </div>
        );

        return (
            <AppBar position='static' style={{display:'inline-block', padding:'8px'}}>
                <div style={{paddingLeft:'0px', paddingRight:'20px', display:'inline-block'}}>
                    <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </div>
                <Typography 
                    variant="h6" 
                    color="inherit"
                    style={{display:'inline-block', verticalAlign:'middle'}}>
                    Prime Finds
                </Typography>

                <div style={{float:'right', paddingTop:'10px', paddingRight:'10px', cursor:'pointer'}}>
                    <FileCopyIcon onClick={this.copyEmails} style={{marginRight:'25px'}}/>
                    <PersonAddIcon onClick={()=>this.setState({modalOpen:true})}/>
                </div>

                <Dialog open={this.state.modalOpen}>
                    <DialogTitle id="form-dialog-title">Add Email</DialogTitle>
                    <DialogContent style={{width:'300px'}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={this.state.modalText}
                            onChange={(e)=>this.setState({modalText: e.target.value})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={()=>this.setState({modalOpen: false, modalText: ''})} 
                            color="primary">
                            Cancel
                        </Button>
                        <Button 
                            onClick={this.addEmail} 
                            color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                <Drawer open={this.state.isOpen} onClose={this.toggleDrawer(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        style={{width:'250px'}}
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}>
                        {sideList}
                    </div>
                </Drawer>
            </AppBar>
        );
    }

    copyEmails() {
        const me  = this;
        const url = 'https://api.mlab.com/api/1/databases/heroku_0lwkfbwj/collections/email?apiKey=aVVSLiUK4fYFdptcpCwQR2sO9QXtZKXs';
        
        axios.get(url).then(resp => {
            let s = resp.data.reduce((acc, current) => acc + current.address + ',', '');
            s = s.substring(0, s.length - 1);
            console.log(s);
        });
    }

    addEmail() {
        console.log(this.state.modalText);
        const url  = "https://api.mlab.com/api/1/databases/heroku_0lwkfbwj/collections/email?apiKey=aVVSLiUK4fYFdptcpCwQR2sO9QXtZKXs";

        axios.post(url, {address:this.state.modalText}).then(resp => console.log(resp));
        this.setState({modalOpen: false, modalText: ''});
    }

    toggleDrawer = open => () => {
        this.setState({
          isOpen: open,
        });
      };
}

export default Header;