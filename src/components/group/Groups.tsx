import React, { useState, useEffect, useContext } from 'react';
import { Group } from '../../models/Group';
import { useBiergitApiClient } from '../../api/useBiergitApiClient';
import { useAuth0 } from '../../auth/auth0-spa';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import theme from '../../theme';
import { TitlebarContext } from '../../providers/TitlebarContextProvider';
import { useTranslation } from 'react-i18next';
import { List } from '@material-ui/core';
import { GroupListItem } from './GroupListItem';
import history from '../../history';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    groupsContainer: {
      padding: theme.spacing(3),
    },
  }),
);

export const Groups: React.FC = () => {
  const { loading } = useAuth0();
  const { setTitle } = useContext(TitlebarContext);
  const classes = useStyles(theme);
  const [groups, setGroups] = useState<Group[]>([]);
  const { getGroups } = useBiergitApiClient();
  const { t } = useTranslation();
  setTitle(t('common_groups'));

  useEffect(() => {
    const initGroups = async (): Promise<void> => {
      const groups = await getGroups();
      if (groups && groups.length > 0) {
        setGroups(groups);
      }
    };
    if (!loading) {
      initGroups();
    }
  }, [loading, getGroups]);

  return (
    <div className={classes.groupsContainer}>
      {groups && groups?.length > 0 ? (
        <div>
          Groups:
          <List>
            {groups.map(group => (
              <GroupListItem
                key={group?.id}
                group={group}
                onClick={(): void => history.push(`/groups/${group.id}`)}
              ></GroupListItem>
            ))}
          </List>
        </div>
      ) : (
        <div>no groups</div>
      )}
    </div>
  );
};
