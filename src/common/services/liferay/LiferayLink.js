import React from 'react';
import { Link } from "react-router-dom";
import {LiferayConf} from './liferay';

export default class LiferayLink extends React.Component {
    render() {
        return (
            <Link
                className={this.props.className}
                to={LiferayConf.friendlyURLContext + this.props.to}
                replace={this.props.replace}
            >
                {this.props.children}
            </Link>
        )
    }
}