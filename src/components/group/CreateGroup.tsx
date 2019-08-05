import React, { useState } from 'react';
import {
    Container,
    makeStyles,
    Theme,
    createStyles,
    Typography,
    List,
    Button,
    Avatar,
    Divider,
    Grid,
    ListItem,
    IconButton,
    FormControl,
    InputLabel,
    Input,
    FormHelperText
} from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt'

import CreateGroupUser from '../user/CreateGroupUser';
import { addGroup } from '../../store/group/actions';
import { useDispatch, useSelector } from 'react-redux';
import { GroupModel } from '../../models/index';
import { AppState } from '../../store';
import history from './../../history';
import { useTranslation } from 'react-i18next';
import { Switch, Route, RouteComponentProps } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            flexGrow: 1,
        },
        createGroupButton: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        },
        divider: {
            margin: 10
        },
        selectedUser: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        cameraIcon: {
            height: 50,
            width: 50,
        },
        inputFile: {
            display: 'none',
        },
        groupName: {
            margin: 10,
        },
        flexContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: 0,
        },
    })
);

interface CreateGroupProps extends RouteComponentProps {
    addGroup: typeof addGroup;
}
interface State {
    groupName: string;
}

const CreateGroup: React.FC<CreateGroupProps> = (props: CreateGroupProps) => {
    const classes = useStyles();

    const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
    const [groupImage, setGroupImage] = useState<string>("");
    const [values, setValues] = React.useState<State>({
        groupName: '',
    });

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const currentUser = useSelector((state: AppState) => state.user.currentUser);
    const users = useSelector((state: AppState) => state.user.users.filter(user => user.user_id !== currentUser.user_id));

    const create = () => {
        const newGroup: GroupModel = {
            id: "d",
            name: values.groupName,
            picture: groupImage,
            members: [...checkedUsers, currentUser.user_id]
        }
        dispatch(addGroup(newGroup));
        history.push('/groups');
    }

    const next = () => {
        history.push('/groups/create/details');
    }

    const toggleCheckedUser = (userId: string) => {
        const currentIndex = checkedUsers.indexOf(userId);
        const newChecked = [...checkedUsers];

        if (currentIndex === -1) {
            newChecked.push(userId);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedUsers(newChecked);
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event && event.target && event.target.files && event.target.files[0] != null) {
            const file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                if (typeof reader.result === "string") {
                    setGroupImage(reader.result);
                }
            }
            reader.readAsDataURL(file);
        }
    }

    const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <Container maxWidth="sm" className={classes.root}>
            <List className={classes.flexContainer}>
                {checkedUsers.map(userId => {
                    let user = users.find(u => u.user_id === userId);
                    if (user == null) {
                        return (
                            <ListItem className={classes.selectedUser}>
                                <Avatar alt="User Logo" />
                            </ListItem>
                        )
                    } else {
                        return (
                            <ListItem key={user.user_id} className={classes.selectedUser}>
                                <Avatar src={user.picture} alt="User Logo" />
                                <Typography variant="body1">{user.name}</Typography>
                            </ListItem>
                        )
                    }
                }
                )}
            </List>
            <Divider variant="middle" className={classes.divider} />
            <Switch>
                <Route path={`${props.match.path}/details`}>
                    <Grid container spacing={5} className={classes.root}>
                        <Grid item xs={12}>
                            <input
                                accept="image/*"
                                className={classes.inputFile}
                                onChange={handleFileUpload}
                                id="camera-button-file"
                                type="file"
                            />
                            <label htmlFor="camera-button-file">
                                <IconButton component="span">
                                    <CameraAltIcon className={classes.cameraIcon} />
                                </IconButton>
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth className={classes.groupName}>
                                <InputLabel htmlFor="group-name">{t('creategroup_name')}</InputLabel>
                                <Input id="group-name"
                                    required
                                    aria-describedby="group-helper-text"
                                    value={values.groupName}
                                    onChange={handleChange('groupName')} />
                                <FormHelperText id="group-helper-text">{t('creategroup_helpertext')}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button className={classes.createGroupButton} onClick={create}>{t('common_create')}</Button>
                        </Grid>
                    </Grid>
                </Route>
                <Route path={`${props.match.path}`}>
                    <Typography variant="h6">{t('creategroup_header')}</Typography>
                    <List>
                        {users.map(user =>
                            <CreateGroupUser userId={user.user_id} toggleCheckedUser={toggleCheckedUser} />
                        )}
                    </List>
                    <Button className={classes.createGroupButton} onClick={next}>{t('common_next')}</Button>
                </Route>
            </Switch>

        </Container>
    )
}

export default CreateGroup;