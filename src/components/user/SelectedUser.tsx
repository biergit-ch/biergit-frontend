import React from 'react';
import { User } from '../../models/User';
import { Avatar, Badge, Box, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import theme from '../../theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectedUserContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      alignContent: 'center',
      marginLeft: theme.spacing(2),
    },
  }),
);

interface SelectedUserProps {
  selectedUser: User;
  handleBadgeClick?: (user: User) => void;
}

export const SelectedUser: React.FC<SelectedUserProps> = (
  props: SelectedUserProps,
) => {
  const classes = useStyles(theme);
  const handleBadgeClick = (): void => {
    if (props.handleBadgeClick) {
      props?.handleBadgeClick(props.selectedUser);
    }
  };
  return (
    <Box className={classes.selectedUserContainer}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClick={(): void => handleBadgeClick()}
        badgeContent={<CancelIcon />}
      >
        <Avatar
          alt={`Avatar n°${props.selectedUser.id}`}
          src={props.selectedUser.pictureUrl}
        />
      </Badge>
      <Typography>{props.selectedUser.firstName}</Typography>
    </Box>
  );
};
