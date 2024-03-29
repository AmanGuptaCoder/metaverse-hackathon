import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ConnectAccount from "../ConnectAccount";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

const pages = ["Home", "Upload", "Gallery"];

function Header(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const {
    isAuthenticated,
    account,
    setMessage,
    setaccount,
    setPageIndex,
    setIsAuthentication } = props;

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#fff" }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "purple",
              textDecoration: "none"
            }}
          >
            <span style={{ fontSize: "35px" }}>D</span>Rythm
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon sx={{ color: "purple" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page, id) => (
                <MenuItem key={id}>
                  <Button onClick={() => setPageIndex(id)} variant='text' >
                    {/* <Typography textAlign="center" sx={{ color: "purple" }}> */}
                      {page}
                    {/* </Typography> */}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "purple",
              textDecoration: "none"
            }}
          >
            <span style={{ fontSize: "35px" }}>D</span>Rythm
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", justifyContent: "flex-start", gap: 4 } }}>
            {pages.map((page, id) => (
              <Button onClick={() => setPageIndex(id)} key={id} sx={{ color: "purple" }}>
                {page}
              </Button>
            ))}
          </Box>
          <ConnectAccount 
            isAuthenticated={isAuthenticated}
            setMessage={setMessage} 
            account={account}
            setAccount={setaccount} 
            setIsAuthentication={setIsAuthentication}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
