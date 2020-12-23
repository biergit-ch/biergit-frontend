import React, { useContext, useState, useEffect } from "react";
import { GroupCreationContext } from "../../../providers/GroupCreationContextProvider";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import theme from "../../../theme";
import { SelectedUsers } from "../../user/SelectedUsers";
import { User } from "../../../models/User";
import { Typography, Grid, TextField, Fab } from "@material-ui/core";
import CameraIcon from "@material-ui/icons/CameraAlt";
import { useTranslation } from "react-i18next";
import { TitlebarContext } from "../../../providers/TitlebarContextProvider";
import { CallToAction } from "../../cta/CallToAction";
import history from "../../../history";
import { useBiergitApiClient } from "../../../api/useBiergitApiClient";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      flexGrow: 1,
    },
    groupDetailInfos: {
      padding: theme.spacing(3),
      fontWeight: "bold",
    },
    groupDetailFields: {
      marginLeft: theme.spacing(3),
    },
  })
);
interface FormState {
  groupName: string;
}
export const GroupDetailsEdit: React.FC = () => {
  const classes = useStyles(theme);
  const [formValues, setFormValues] = useState<FormState>({
    groupName: "",
  });
  const { groupId } = useParams<{ groupId: string }>();
  const { getGroupById } = useBiergitApiClient();
  const { setTitle } = useContext(TitlebarContext);
  const { t } = useTranslation();
  const { selectedUsers, toggleSelectedUser, setSelectedUsers } = useContext(
    GroupCreationContext
  );
  const { createGroup, updateGroup } = useBiergitApiClient();

  setTitle(t("creategroup_header"));

  useEffect(() => {
    const initGroup = async (): Promise<void> => {
      const group = await getGroupById(groupId);
      setFormValues({
        groupName: group.groupName,
      });
      setSelectedUsers(group.members);
    };
    if (groupId && groupId !== "" && groupId !== "undefined") {
      initGroup();
    }
  }, [setSelectedUsers, groupId, getGroupById]);

  const handleChange = (prop: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };
  const openCamera = (): void => {
    console.log("TODO: open image picker");
  };
  const create = async (): Promise<void> => {
    if (groupId && groupId !== "" && groupId !== "undefined") {
      await updateGroup(groupId, formValues.groupName, selectedUsers);
    } else {
      await createGroup(formValues.groupName, selectedUsers);
    }
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <SelectedUsers
        selectedUsers={selectedUsers}
        removeSelectedUser={(user: User): void => toggleSelectedUser(user)}
      />
      <Grid container>
        <Grid item>
          <Typography variant="body1" className={classes.groupDetailInfos}>
            {t("groupdetail_provideinfo")}
          </Typography>
        </Grid>
        <Grid item>
          <Fab
            component="button"
            onClick={(): void => openCamera()}
            className={classes.groupDetailFields}
          >
            <CameraIcon />
          </Fab>
        </Grid>
        <Grid item>
          <TextField
            className={classes.groupDetailFields}
            variant="filled"
            label={t("groupdetail_name")}
            value={formValues.groupName}
            onChange={handleChange("groupName")}
          />
        </Grid>
      </Grid>
      <CallToAction
        action={(): Promise<void> => create()}
        tooltip={t("common_create")}
        icon="check"
      />
    </div>
  );
};
