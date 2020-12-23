import React, { useContext } from 'react';
import { useAuth0 } from '../../auth/auth0-spa';
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import { Loading } from '../../common/components/Loading';
import { UserContext } from '../../providers/UserContextProvider';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: 150,
      height: 150,
      margin: 'auto',
    },
  }),
);

const Profile: React.FC = () => {
  const { loading, isAuthenticated } = useAuth0();
  const { currentUser } = useContext(UserContext);
  const classes = useStyles({});

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : isAuthenticated ? (
        <div>
          <Typography component="h5" variant="h5" gutterBottom>
            Profil
          </Typography>
          {currentUser && (
            <React.Fragment>
              <Avatar className={classes.avatar} src={currentUser.pictureUrl} />
              <TextField
                disabled
                label="Name"
                value={currentUser.fullName}
                margin="normal"
              />
              <br />
              <TextField
                disabled
                label="Email"
                value={currentUser.email}
                margin="normal"
              />
              <br />
              <TextField
                disabled
                label="Mitglied seit"
                value={currentUser.importedAt}
                margin="normal"
              />
              <br />
              <br />
              <Typography component="h6" variant="h6" gutterBottom>
                Einstellungen
              </Typography>
              <FormControlLabel
                disabled
                control={<Checkbox value="checkedD" />}
                label="Email Benachrichtigung"
              />
              <br />
              <FormControlLabel
                disabled
                control={<Checkbox value="checkedD" />}
                label="Newsletter"
              />
              <br />
              <Button variant="contained" disabled>
                Speichern
              </Button>
            </React.Fragment>
          )}
        </div>
      ) : (
        <div>Unauthorized</div>
      )}
    </Container>
  );
};

export default Profile;
