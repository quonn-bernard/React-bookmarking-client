import React from 'react';
import AsideBtn from '../../Components/AsideBtn/AsideBtn';

export default class AccountPanel extends React.Component {


    render() {
        return (
            <AsideBtn icon={this.props.icon} name={this.props.profile.username}></AsideBtn>
        )
    }
}