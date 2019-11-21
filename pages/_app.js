import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import App, { Container } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import AppContext from '../lib/AppContext';

class _App extends App {
  constructor(...args) {
    super(...args);

    this.state = {
      title: '',
      drawerOpened: false,
    };
  }

  render() {
    const {
      Component,
      pageProps,
    } = this.props;

    const {
      title,
      drawerOpened,
    } = this.state;

    const context = {
      title,
      setTitle: newTitle => this.setState({
        title: newTitle,
      }),
    };

    return (
      <>
        <Head>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <title>
            Mysteries / {title}
          </title>
        </Head>

        <CssBaseline />

        <AppContext.Provider value={context}>
          <Container>
            <AppBar>
              <Toolbar>
                <IconButton color="inherit" edge="start" onClick={() => this.setState({
                  drawerOpened: !drawerOpened,
                })} style={{
                  marginRight: 16,
                }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                  Mysteries / {title}
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer open={drawerOpened} onClose={() => this.setState({
              drawerOpened: false,
            })}>
              <List>
                <div style={{
                  width: 240,
                }}>
                  <ListItem button component="a" href="/">
                    <ListItemText>
                      Home
                    </ListItemText>
                  </ListItem>
                  {/* <ListItem button component="a" href="/cyberboost">
                    <ListItemText>
                      CyberBoost
                    </ListItemText>
                  </ListItem> */}
                  {/* <ListItem button component="a" href="/tagbooru">
                    <ListItemText>
                      TagBooru
                    </ListItemText>
                  </ListItem>
                  <ListItem button component="a" href="/musicbooru">
                    <ListItemText>
                      MusicBooru
                    </ListItemText>
                  </ListItem> */}
                  <ListItem button component="a" href="https://github.com/evshiron" target="_blank">
                    <ListItemText>
                      GitHub
                    </ListItemText>
                  </ListItem>
                </div>
              </List>
            </Drawer>
            <Component {...pageProps} />
          </Container>
        </AppContext.Provider>
      </>
    );
  }
}

export default dynamic(async () => _App, {
  ssr: false,
});
