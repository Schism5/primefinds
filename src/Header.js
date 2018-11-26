import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar className="title_bar" position='static'>
                <div className="title_info">
                    <span className="thd_logo"></span>
                    <div className="title_with_number">
                        <span className="page_title">ok</span>
                        <span className="active_user">ok</span>
                    </div>
                </div>
                <div className="title_bar_right">
                    ok
                    <i className="icon_exit-to-app exit" title="Click to exit." onClick={(e)=>window.close()}></i>
                </div>
            </AppBar>
        );
    }
}

export default Header;