import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import {genericGet} from '../utils/requestsManager';

export default class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userCedula: '',
            loading: false
        };
        this.searchUser = this.searchUser.bind(this);
    }

    searchUser(){
        this.setState({loading:true});
        // NEED SESSION ID TO OVERCOME CORS 
        genericGet(
            'http://podosys.soel.com.co/index.php?sid=t3o1oe2shnlcg5oadp8j4k77b3&entryPoint=obtener_paciente&cedula=938472',
            (data)=>{
                console.log(data);
                //loading =true 
                // check if user exists 
                //if exists, then exit modal and input info in main view
                //loading to true either way (valid or invalid user) 
            },
            //todo make snackbar
            ()=>console.log('error.')
        );

    }

    renderSearchCard(){
        return (
            <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Search user
                        </Typography>
                        <Grid container justify='center' alignItems='flex-end'>
                            <Grid item>
                                <TextField
                                    id="username"
                                    label="Cédula"
                                    // className={classes.textField}
                                    value={this.state.userCedula}
                                    onChange={(x) => this.setState({ userCedula: x.target.value })}
                                // margin="auto"
                                />

                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={this.searchUser}>
                                    <SearchIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions >
                        <Button size="small" color="secondary" onClick={this.props.toggleModal}>
                            Cancel
                        </Button>
                    </CardActions>
                </Card>);
    }

    renderLoading(){
        return (
            <Card className='waitingCard'>
              <Grid className='gridWaiting'
                container
                spacing={4}
                direction="column"
                alignItems="center"
                justify="space-around" >
                <Grid item xs={12}>
                  <Typography variant="h5" component="h2" align='center'>
                    Searching user...
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <CircularProgress />
                </Grid>
              </Grid>
            </Card >
            );
    }

    render() {
        return (
            <div>
                {!this.state.loading ? this.renderSearchCard() : this.renderLoading()}
            </div>
        );
    }
}

SearchUser.propTypes = {
    toggleModal: PropTypes.func,
    setUser: PropTypes.func
};