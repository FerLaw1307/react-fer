import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AccountCard from "../../components/account/account-card";
import { useAccounts } from "../../hooks/useAccounts";
import { Button, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export default function Home() {
  // const listAccount = [new AccountViewModel()];
  // const { accounts, loading, error } = {accounts: listAccount,  loading: true , error :""};
  const { accounts, loading, error } = useAccounts();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Mis cuentas
      </Typography>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AddIcon></AddIcon>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>

      
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && accounts.length > 0 && (
        <Grid container spacing={2}>
          {accounts.map((acc) => (
            <Grid item xs={12} sm={6} md={4} key={acc.id}>
              <AccountCard account={acc} />
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && accounts.length === 0 && !error && (
        <Typography color="textSecondary">
          No hay cuentas disponibles
        </Typography>
      )}
    </Box>
  );
}
