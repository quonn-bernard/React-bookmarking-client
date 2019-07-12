import React from 'react';

class NavBar extends React.Component {

    render() {
        return (
            <nav className="nav-grid">
                <div>
                    <h1>V-MARKER</h1>
                </div>
                <div className="nav-menu-grid">
                    <div className="acct-btn"><h5>AP</h5></div>
                    <div className="nav-plus-btn"><h5>+</h5></div>
                    <div className="hamburger-icon" onClick={this.props.swapOpen}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

            </nav>
        )
    }
}

export default NavBar;