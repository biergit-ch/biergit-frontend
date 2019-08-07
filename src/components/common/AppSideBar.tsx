import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import SettingsIcon from '@material-ui/icons/Settings';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useTranslation } from 'react-i18next';
import GroupList from '../group/GroupList';
import AddGroup from '../group/AddGroup';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        sideBarLeftMargin: {
            marginLeft: theme.spacing(3),
        },
        sideBarListPadding: {
            padding: theme.spacing(3),
        },
        toolbar: theme.mixins.toolbar,

    })
);

const AppSideBar: React.FC = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    const inviteClick = () => {
        let newVariable: any;
        newVariable = window.navigator;
        if (newVariable.share) {
            newVariable.share({
                title: t('share_title'),
                text: t('share_text'),
                url: window.location.href
            }).then(() => {
                console.log('Thanks for sharing!');
            })
                .catch((err: Error) => {
                    console.log(`Couldn't share because of`, err.message);
                });
        } else {
            console.log('web share not supported');
            window.location.href = `mailto:?body=&${t('share_text')}subject=${t('share_title')}`;
        }
    }

    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <Typography variant="h6" className={classes.sideBarLeftMargin}>
                {t('common_groups')}
            </Typography>
            <GroupList />
            <AddGroup />
            <Divider />
            <List className={classes.sideBarListPadding}>
                <ListItem button key="invite" onClick={inviteClick}>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('sidebar_invite')} />
                </ListItem>
                <ListItem button key="feedback">
                    <ListItemIcon>
                        <StarBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('sidebar_feedback')} />
                </ListItem>
                <ListItem button key="settings">
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('sidebar_settings')} />
                </ListItem>
            </List>
        </div>
    );

}

export default AppSideBar;