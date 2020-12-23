import React, { ReactElement } from 'react';
import Icon from '@material-ui/core/Icon';
import { Tooltip, Fab } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import theme from '../../theme';

interface CallToActionProps {
  action: () => void;
  icon: ReactElement | string;
  tooltip: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cta: {
      margin: 1,
      padding: 1,
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
      cursor: 'pointer',
    },
    ctaFab: {
      height: theme.spacing(7),
      width: theme.spacing(7),
    },
  }),
);
export const CallToAction: React.FC<CallToActionProps> = (
  props: CallToActionProps,
) => {
  const classes = useStyles(theme);
  return (
    <div className={classes.cta}>
      <Tooltip title={props.tooltip}>
        <Fab
          className={classes.ctaFab}
          color="secondary"
          onClick={(): void => props.action()}
          size="large"
        >
          {typeof props.icon === 'string' ? (
            <Icon fontSize="large">{props.icon}</Icon>
          ) : (
            <img
              src={props.icon.props.src}
              alt={props.icon.props.alt}
              style={{ width: theme.spacing(4), height: theme.spacing(4) }}
            />
          )}
        </Fab>
      </Tooltip>
    </div>
  );
};
