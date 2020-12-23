import React from 'react';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import theme from '../../theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      flexGrow: 1,
      textAlign: 'center',
      alignItems: 'center',
      paddingTop: theme.spacing(3),
    },
    noPadding: {
      paddingTop: 0,
    },
  }),
);

interface LoadingProps {
  color?: 'primary';
  noPadding?: boolean;
}

export const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
  const classes = useStyles(theme);
  return (
    <div
      className={clsx(classes.root, {
        [classes.noPadding]: props.noPadding === true,
      })}
    >
      <Box mx="auto" my="auto">
        <CircularProgress color={props.color ? props.color : 'secondary'} />
      </Box>
    </div>
  );
};
