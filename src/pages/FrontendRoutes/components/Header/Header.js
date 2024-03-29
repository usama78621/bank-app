import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import '../../../../scss/_header.scss'
import { useGobalContext } from '../../../../context/UserContext'
import { Button } from '@mui/material';
import { auth } from '../../../../config/Firebase-uitles';
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
const drawerWidth = 240;
const navItems = [
    {
        id: 1,
        name: "Home",
        url: "/"
    },
    {
        id: 2,
        name: "Dashboard",
        url: "/dashboard"
    },
];

function Header(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { user } = useGobalContext()

    const handleLogout = () => {
        signOut(auth)
            .then(() => {

                toast.success("Logout Successfully!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(() => {
                alert("error");
            });
    };


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                My bank
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.url} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav" style={{
                position: "static",
                backgroundColor: "#fff"
            }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: "gold" } }}
                    >
                        My Bank
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        <Link to='/' style={{
                            textDecoration: "none",
                            color: "#222",
                            margin: 10,
                            fontSize: "20px"
                        }}>
                            Home
                        </Link>
                        {user.uid &&
                            <Link to='/dashboard' style={{
                                textDecoration: "none",
                                color: "#222",
                                margin: 10,
                                fontSize: "20px"
                            }}>
                                Dashboard
                            </Link>
                        }
                        {!user.uid ?
                            <Link to='/login' style={{
                                textDecoration: "none",
                                color: "#222",
                                margin: 10,
                                fontSize: "20px"

                            }}>
                                Login
                            </Link>
                            : <Button onClick={handleLogout} variant="text" style={{
                                fontSize: "20px",
                                color: "#222"

                            }} >Logout</Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <Box>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box >
    );
}



export default Header;
