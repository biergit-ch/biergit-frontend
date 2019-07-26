
import React, { useState } from 'react';
import { RouteComponentProps } from "react-router";
import { Container, makeStyles, Theme, createStyles, Typography, List, Button } from '@material-ui/core';

import GroupUser from '../user/GroupUser';
import { AppState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addExpense } from '../../store/expense/actions';
import { ExpenseModel } from '../../models';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        memberList: {
            marginTop: theme.spacing(2)
        },
        spendBeerButton: {
            background: theme.palette.primary.main,
            marginTop: theme.spacing(2),
        },
    })
);

interface GroupIdentificable { groupId: string; }

interface GroupProps extends RouteComponentProps<GroupIdentificable> {
    addExpense: typeof addExpense;
}

const Group: React.FC<GroupProps> = (props: GroupProps) => {
    const classes = useStyles({});
    const actGroup = useSelector((state: AppState) => state.group.groups.filter(g => g.id === props.match.params.groupId)[0]);
    const currentUser = useSelector((state: AppState) => state.user.users[0]);
    const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const toggleCheckedUser = (userId: string) => {
        const currentIndex = checkedUsers.indexOf(userId);
        const newChecked = [...checkedUsers];

        if (currentIndex === -1) {
            newChecked.push(userId);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedUsers(newChecked);
    }

    const spendBeer = () => {
        checkedUsers.forEach(userId => {
            const expense: ExpenseModel = {
                context: actGroup.id,
                from: currentUser.user_id,
                to: userId,
                amount: 1,
            }
            dispatch(addExpense(expense));
        });
        setCheckedUsers([]);
    }

    return (
        <Container maxWidth="sm">
            <div>
                <Typography variant="h4">{actGroup.name}</Typography>

                <List className={classes.memberList}>
                    {(
                        actGroup.members.map(userId =>
                            <GroupUser userId={userId} groupId={actGroup.id} toggleCheckedUser={toggleCheckedUser} checked={checkedUsers.some(uId => uId === userId)} />
                        ))}
                </List>

                <Button className={classes.spendBeerButton} onClick={() => spendBeer()}>
                    {t('group_spendbeer')}
                </Button>
            </div>
        </Container>
    );
}

export default Group;
