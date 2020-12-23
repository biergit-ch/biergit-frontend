import React, { useContext } from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Avatar,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import theme from '../../../theme';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import history from '../../../history';
import { TitlebarContext } from '../../../providers/TitlebarContextProvider';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    newGroupIcon: {
      backgroundColor: theme.palette.secondary.main,
    },
  }),
);
export const NewGroup: React.FC = () => {
  const classes = useStyles(theme);
  const { setTitle } = useContext(TitlebarContext);
  const { t } = useTranslation();
  setTitle(t('common_friends'));

  return (
    <ListItem onClick={(): void => history.push('/group/create/new')}>
      <ListItemAvatar>
        <Avatar className={classes.newGroupIcon}>
          <GroupAddIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Box fontWeight="fontWeightBold">New Group</Box>
      </ListItemText>
    </ListItem>
  );
};
