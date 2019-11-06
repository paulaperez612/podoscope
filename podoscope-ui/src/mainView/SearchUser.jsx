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



export default class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = { userCedula: '' };
    }
    render() {
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
                            <Button variant="contained" color="primary" >
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
            </Card>
        )
    }
}

SearchUser.propTypes = {
    toggleModal: PropTypes.func,
    setUser: PropTypes.func
};