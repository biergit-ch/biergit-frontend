/* eslint-disable react/prop-types */
import * as React from 'react';
import WebShare from '../../common/components/webshare/WebShare';
import { WebShareInterface } from '../../common/components/webshare/types';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

export interface ShareableListItemProps {
  text: string;
}

const ShareableListItem: React.StatelessComponent<WebShareInterface &
  ShareableListItemProps> = ({ share, isSupported, text }) =>
  isSupported ? (
    <ListItem button key="share" onClick={share}>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  ) : (
    // TODO: Implement fallback
    <div></div>
  );

export default WebShare<ShareableListItemProps>()(ShareableListItem);
