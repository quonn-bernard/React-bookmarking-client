import React from 'react';

class MblNav extends React.Component {

    render() {
        const open = (!this.props.open && 'ease-close') || 'ease-open';
        return (
            <article id="mbl-nav" className={open}>
                <div className="acct-btn"><h5>AP</h5></div>
                <div className="nav-plus-btn"><h5>+</h5></div>
                mbl nav
            </article>
        )
    }
}

export default MblNav;