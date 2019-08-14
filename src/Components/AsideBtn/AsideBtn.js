import React from 'react';
import './AsideBtn.css';

class AsideBtn extends React.Component{

    render(){
        return(
            <btn style={{textDecoration: "none"}} className="aside-btn">{this.props.icon}{this.props.name}</btn>
        )
    }
}

export default AsideBtn;