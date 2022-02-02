import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthService from "../../Services/Auth.service";
import logo from "../../Resources/Logo.svg";
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

interface user {
  id: number | null;
  password: string;
  token: string;
  username: string;
}

const Topbar = () => {
  const [user, setUser] = useState<user>({
    id: null,
    password: "",
    token: "",
    username: "",
  });
  const history = useHistory();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      setUser(AuthService.getCurrentUser());
    } else {
      history.push("/login");
    }
  }, [history]);

  const onLogout = () => {
    AuthService.logout();
    history.push("/login");
  };

  const onHomeClick = () => {
    history.push("/");
  };

  const onLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <div style={{ marginBottom: "165px" }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                <img
                  src={logo}
                  height="33px"
                  alt="Logo"
                  style={{ marginRight: "10px" }}
                />
                <Typography variant="h5">MD-Notes</Typography>
              </div>
            </Grid>
            <div>
              <Grid
                container
                item
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <EmailShareButton url="https://mdnotes.azurewebsites.net/">
                    <EmailIcon size={32} round={true} />
                  </EmailShareButton>
                </Grid>
                <Grid item>
                  <FacebookShareButton
                    quote={"Check out this note mark down collection tool!"}
                    hashtag={"#MDnotes"}
                    url="https://mdnotes.azurewebsites.net/"
                  >
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                </Grid>
                <Grid item>
                  <RedditShareButton
                    title="Note mark down collection tool"
                    url="https://mdnotes.azurewebsites.net/"
                  >
                    <RedditIcon size={32} round={true} />
                  </RedditShareButton>
                </Grid>
                <Grid item>
                  <TwitterShareButton
                    title="Note mark down collection tool"
                    url="https://mdnotes.azurewebsites.net/"
                  >
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>
                </Grid>
                <Grid item>
                  <WhatsappShareButton
                    title="Note mark down collection tool"
                    url="https://mdnotes.azurewebsites.net/"
                  >
                    <WhatsappIcon size={32} round={true} />
                  </WhatsappShareButton>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid
                item
                container
                spacing={4}
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={2}>
                  <Typography variant="button">{user.username}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button color="inherit" onClick={onHomeClick}>
                    {t("home")}
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button color="inherit" onClick={onLogout}>
                    {t("logout")}
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Select
                    labelId="changeLan"
                    id="changeLan"
                    value={i18n.language}
                    onChange={onLanguageChange}
                    variant="outlined"
                  >
                    <MenuItem value={"en"}>en</MenuItem>
                    <MenuItem value={"ko"}>ko</MenuItem>
                    <MenuItem value={"chi"}>chi</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Topbar;
