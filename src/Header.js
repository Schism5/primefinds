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

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
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

    toggleDrawer = open => () => {
        this.setState({
          isOpen: open,
        });
      };
}

export default Header;