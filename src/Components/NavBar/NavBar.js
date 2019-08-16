import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {

    render() {
        return (
            <nav className="nav-grid">
                <div>
                    <Link to='/'><h1>{this.props.children}</h1></Link>
                </div>
                <div className="nav-menu-grid">
                    <div>
                    </div>
                    <div></div>
                    <div>
                        <div className="hamburger-icon" onClick={this.props.swapOpen}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                </div>

            </nav>
        )
    }
}

export default NavBar;