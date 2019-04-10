import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];
const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!, $name: String!, $secret: String!) {
        signup(email: $email, password: $password, name: $name, secret: $secret) {
            token
        }
    }
`

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`
class Login extends Component {
    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: '',
        secret:'',
        name: '',
    }
    handleChange = e => {
        e.preventDefault()
        this.setState({[e.target.name] : e.target.value})
    }

    render() {
        const { login, email, password, name, secret } = this.state
        const { classes } = this.props;
        return (
            <div>
                <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
                <div className="flex flex-column">
                    <form className={classes.container} noValidate autoComplete="off">
                    {!login && (

                        <TextField
                        id="outlined-name"
                        label="Your name"
                        className={classes.textField}
                        value={name}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        />
                    )}
                    
                        <TextField
                            id="outlined-name"
                            label="Your email address"
                            className={classes.textField}
                            value={email}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-name"
                            label="Choose a safe password"
                            className={classes.textField}
                            value={password}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-name"
                            label="Choose a safe secret"
                            className={classes.textField}
                            value={secret}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </form>
                </div>
                <div className="flex mt3">
                    <Mutation
                        mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                        variables={{ email, password, name, secret }}
                        onCompleted={data => this._confirm(data)}
                    >
                        {mutation => (
                            <div className="pointer mr2 button" onClick={mutation}>
                                {login ? 'login' : 'create account'}
                            </div>
                        )}
                    </Mutation>
                    <div
                        className="pointer button"
                        onClick={() => this.setState({ login: !login })}
                    >
                        {login
                            ? 'need to create an account?'
                            : 'already have an account?'}
                    </div>
                </div>
            </div>
        )
    }

    _confirm = async data => {
        const { token } = this.state.login ? data.login : data.signup
        this._saveUserData(token)
        console.log('token: ', token)
        this.props.history.push(`/`)
    }
    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

export default withStyles(styles)(Login)