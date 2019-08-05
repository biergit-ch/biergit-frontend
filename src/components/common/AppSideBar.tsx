import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useTranslation } from 'react-i18next';
import Groups from '../group/Groups';
import history from '../../history';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        toolbar: theme.mixins.toolbar,

    })
);

const AppSideBar: React.FC = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <Typography variant="h6">
                {t('common_groups')}
            </Typography>
            <Groups />
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

}

export default AppSideBar;