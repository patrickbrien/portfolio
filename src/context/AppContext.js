import React, { Component, createContext } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext({});

class AppProvider extends Component {
  state = {
    cartActive: false,
    menuActive: false,
    headerHeight: 0
  };

  //

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log(`%c <3 + $ `, `background: #000000; color: #00ff00`);
  }

  //

  setHeaderHeight = headerHeight => {
    this.setState({
      headerHeight
    });
  };

  setCartActive = cartActive => {
    this.setState({
      cartActive
    });
  };

  setMenuActive = menuActive => {
    this.setState({
      menuActive
    });
  };

  //

  render() {
    return (
      <AppContext.Provider
        value={{
          cartActive: this.state.cartActive,
          menuActive: this.state.menuActive,
          headerHeight: this.state.headerHeight,
          //
          setCartActive: this.setCartActive,
          setMenuActive: this.setMenuActive,
          setHeaderHeight: this.setHeaderHeight
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppProvider;
