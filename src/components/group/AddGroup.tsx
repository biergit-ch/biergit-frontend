import React from 'react';
import { Theme, createStyles, makeStyles, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addIcon: {
            margin: 10,
            width: 40,
            height: 40,
        }
    })
);

const AddGroup: React.FC = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <ListItem button key="creategroup">
            <ListItemIcon>
                <AddIcon className={classes.addIcon} />
            </ListItemIcon>
            <ListItemText primary={t('group_creategroup')} />
        </ListItem>
    )
}

export default AddGroup;