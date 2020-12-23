import React, { useState, MouseEvent } from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import theme from '../../theme';
import { red, green } from '@material-ui/core/colors';
import SwipeableViews from 'react-swipeable-views';

import { DateUtil } from '../../common/util/DateUtil';

import GroupIcon from '@material-ui/icons/Group';
import UserIcon from '@material-ui/icons/Person';
import { useTranslation } from 'react-i18next';
import { User } from '../../models/User';
import { Group } from '../../models/Group';
import { Loading } from '../../common/components/Loading';

interface ExpenseItemProps {
  type: 'user' | 'group';
  title?: string;
  avatar?: string;
  lastActivity?: Date;
  owe?: number;
  user?: User;
  group?: Group;
  addExpense: (param?: User | Group) => Promise<void>;
  onClick?: (param?: User | Group) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    redText: {
      color: red.A700,
    },
    greenText: {
      color: green.A700,
    },
    spendBeer: {
      padding: 15,
      background: theme.palette.success.light,
      alignContent: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
    },
    beerImage: {
      height: 30,
      alignContent: 'center',
      display: 'block',
    },
  }),
);

export const ExpenseItem: React.FC<ExpenseItemProps> = (
  props: ExpenseItemProps,
) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const classes = useStyles(theme);

  const changeIndex = (newIndex: number): void => {
    setIndex(newIndex);
  };

  const swipeTransitionEnd = async (): Promise<void> => {
    if (index === 0) {
      setLoading(true);
      if (props.type === 'group') {
        await props.addExpense(props.group);
      } else if (props.type === 'user') {
        await props.addExpense(props.user);
      }
      setLoading(false);
      setIndex(1);
    }
  };

  const listItemClick = (event: MouseEvent): void => {
    event.preventDefault();
    if (props?.onClick !== undefined) {
      props.onClick(props.group);
    }
  };

  return (
    <SwipeableViews
      resistance
      enableMouseEvents={true}
      onChangeIndex={(index: number): void => changeIndex(index)}
      onTransitionEnd={(): Promise<void> => swipeTransitionEnd()}
      index={index}
    >
      <div className={classes.spendBeer} key={0}>
        {loading ? (
          <Loading color="primary" noPadding={true} />
        ) : (
          <Typography variant="h4">{t('expense_spendbeer')}</Typography>
        )}
      </div>
      <ListItem key={1} onClick={props.onClick ? listItemClick : undefined}>
        <ListItemAvatar>
          {props.type === 'group' ? (
            <Avatar>
              <GroupIcon />
            </Avatar>
          ) : props.avatar ? (
            <Avatar src={props.avatar} />
          ) : (
            <Avatar>
              <UserIcon />
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={props.title}
          secondary={
            props.lastActivity
              ? DateUtil.timeDifferenceFromNow(props.lastActivity)
              : 'Maybe a long long time ago?'
          }
        />
        <ListItemSecondaryAction>
          {props.owe ? (
            props.owe < 0 ? (
              <Typography className={classes.redText}>{props.owe}</Typography>
            ) : (
              <Typography className={classes.greenText}>{props.owe}</Typography>
            )
          ) : (
            <Typography>0</Typography>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    </SwipeableViews>
  );
};
