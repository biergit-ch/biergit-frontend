import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, makeStyles, createStyles, Theme, Avatar, Typography, Grid } from '@material-ui/core';

import { AppState } from '../../store';
import { ReactComponent as Beer } from './../common/images/beer.svg';
import { ReactComponent as BeerEmpty } from './../common/images/beer_empty.svg';
import { useSelector } from 'react-redux';
import { red, green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userAvatar: {
            margin: 10,
        },
        userName: {
            margin: 10,
        },
        beerLogo: {
            height: 25,
        },
        beerEmptyLogo: {
            height: 25,
        },
        redText: {
            color: red.A700,
        },
        greenText: {
            color: green.A700,
        }
    })
)

interface UserProps {
    userId: string;
    groupId: string;
    checked: boolean;
    toggleCheckedUser: Function;
}

const GroupUser: React.FC<UserProps> = (props: UserProps) => {
    const classes = useStyles();
    const user = useSelector((state: AppState) => state.user.users.filter(user => user.user_id === props.userId)[0]);
    const currentUser = useSelector((state: AppState) => state.user.users[0]);
    const groupExpenses = useSelector((state: AppState) => state.expense.expenses.filter(e => e.context === props.groupId));
    const fromCurrentUserToUserExpenses = groupExpenses.filter(e => e.from === currentUser.user_id && e.to === props.userId);
    const fromUserToCurrentUserExpenses = groupExpenses.filter(e => e.from === props.userId && e.to === currentUser.user_id);


    const plusAmount = fromCurrentUserToUserExpenses.reduce((prev, ex) => prev + ex.amount, 0);
    const minusAmount = fromUserToCurrentUserExpenses.reduce((prev, ex) => prev + ex.amount, 0);

    const expenseAmount = plusAmount - minusAmount;

    return (
        <ListItem key={user.user_id}>
            <ListItemAvatar>
                <Avatar src={user.picture} alt="Group Logo" className={classes.userAvatar} />
            </ListItemAvatar>
            <ListItemText primary={user.name} className={classes.userName} />
            <ListItemSecondaryAction onClick={() => { props.toggleCheckedUser(user.user_id); }}>
                <Grid container>
                    <Grid item xs={6}>
                        {(
                            expenseAmount < 0 ?
                                <Typography className={classes.redText}>{expenseAmount}</Typography>
                                :
                                <Typography className={classes.greenText}>+{expenseAmount}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        {(
                            props.checked === true ? <Beer className={classes.beerLogo} /> : <BeerEmpty className={classes.beerEmptyLogo} />
                        )}
                    </Grid>
                </Grid>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default GroupUser;