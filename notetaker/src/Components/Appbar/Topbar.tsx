import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
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

const Topbar = (props: any) => {
  const [user, setUser] = useState({
    id: null,
    password: "",
    token: "",
    username: "",
  });
  const history = useHistory();

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

  return (
    <div style={{ marginBottom: "150px"}}>
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
                <Grid item>
                  <Typography variant="button">{user.username}</Typography>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={onHomeClick}>
                    Home
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={onLogout}>
                    log out
                  </Button>
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
