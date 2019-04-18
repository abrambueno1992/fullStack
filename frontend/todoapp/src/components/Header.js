import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../constants";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: "gray"
  },
  input: {
    display: "none"
  }
});
class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const { classes } = this.props;
    return (
      <div className="flex pa1 justify-between nowrap orange">
        
        <div className="flex flex-fixed">
          {authToken ? (
            <div
              className="ml1 pointer black"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                this.props.history.push(`/`);
              }}
            >
              logout
            </div>
          ) : (
            <Link to="/login">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                login
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Header));
