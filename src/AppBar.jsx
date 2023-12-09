import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { GradingRounded, HouseOutlined, LibraryBooksRounded, LogoutRounded, SchoolRounded } from "@mui/icons-material";

import AccountCircle from '@mui/icons-material/AccountCircle';
import Cookies from "js-cookie";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#303030",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => (
    {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor: '#242424',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function CustomAppBar({kelasId, mode, position, children}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const pages = mode == 'Kelas' ? [
    {name: 'Kelas', url: '/kelas', icon: <SchoolRounded />},
    {name: 'Mapel', url: `/mapel/${kelasId}`, icon: <LibraryBooksRounded />},
    {name: 'Nilai', url: `/nilai/${kelasId}`, icon: <GradingRounded />},
  ] : [
    {name: 'Kelas', url: '/kelas', icon: <SchoolRounded />},
  ]
  const navigate = useNavigate()

  function getCookie(){
    const cookie = Cookies.get()
    if(!cookie.username) return navigate('/')
  }

  function logout(){
    Cookies.remove('username')
    navigate('/')
  }

  useEffect(() => getCookie())
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{boxShadow: 0}} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <AccountCircle sx={{marginRight: 5}}/>
          <Typography variant="h6" noWrap component="div">
            {position}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton sx={{
            color: '#fff'
          }} onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pages.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate(text.url)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#fff'
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
          </ListItem>
          ))}
        <Divider />
          <ListItemText primary="Administrasi" style={{opacity: open ? 0.7: 0, textAlign: 'center'}} />
          <Divider />
        <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => logout()}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#fff'
                  }}
                  >
                  <LogoutRounded />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, padding: '24px'}}>
        {children}
      </Box>
    </Box>
  );
}

export default CustomAppBar;
