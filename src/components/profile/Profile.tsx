import React, { useEffect, useState } from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    createStyles,
    Theme,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useAuth0 } from '../../react-auth0-spa';
import { RouteComponentProps } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        card: {
            maxWidth: 345,
            margin: '0 auto',
            justifyContent: 'center',
            textAlign: 'center',
        },
        media: {
            height: 64,
            width: 64,
            objectFit: 'cover',
            margin: '0 auto',
        },
        fancyButton: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            marginLeft: 20,
        },
    })
);

const Profile: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const classes = useStyles({});
    const { user, isAuthenticated, loginWithRedirect, logout }: any = useAuth0();

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setAuthenticated(isAuthenticated)
    }, [isAuthenticated, user])

    const signIn = async () => {
        await loginWithRedirect({
            appState: { targetUrl: '/' }
        });
    }

    const signOut = () => {
        logout();
    }


    return (
        <div className={classes.root}>
            <Grid
                container={true}
                spacing={3}
                justify="center"
                style={{ padding: 1 }}
            >
                {authenticated && (<Grid item={true} xs={12}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={user.picture}
                                title={user.name}
                            />
                            <CardContent>
                                <Typography gutterBottom={true} variant="h5" component="h2">
                                    {user.name}
                                </Typography>
                                <pre>
                                    <Typography component="p">
                                        {JSON.stringify(user, null, 2)}
                                    </Typography>
                                </pre>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                )}
                <Grid item={true} xs={12}>
                    {!authenticated && (<Button className={classes.fancyButton} onClick={signIn}>SIGNIN</Button>)}
                    {authenticated && (<Button className={classes.fancyButton} onClick={signOut}>SIGNOUT</Button>)}
                </Grid>
            </Grid>
        </div>
    );
}

export default Profile;