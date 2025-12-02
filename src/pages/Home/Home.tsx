import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AccountCard from "../../components/account/account-card";
import { useAccounts } from "../../hooks/useAccounts";
import { Button, Card, CardContent} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import { RemoveCircle } from "@mui/icons-material";

export default function Home() {
  // const listAccount = [new AccountViewModel()];
  // const { accounts, loading, error } = {accounts: listAccount,  loading: true , error :""};
  const { accounts, loading, error } = useAccounts();

  const balance: number = 18500;
  const buttons = [
    { label: "Ingreso", icon: <AddIcon />, url: "/transactions/new?type=income" },
    { label: "Gasto", icon: <RemoveCircle />, url: "/transactions/new?type=expense" },
    { label: "Cuenta", icon: <AddIcon />, url: "/account-create" }, 
  ];
  const navigate = useNavigate();



  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Mis cuentas
      </Typography>

      {/* Contenedor centrado para la tarjeta de balance */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Card
          sx={{
            width: { xs: "100%", sm: "100%", md: 700 },
            borderRadius: 3,
            borderColor: 'black',
            borderWidth: 1,
            borderStyle: 'solid',
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                gap: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ opacity: 0.9, textAlign: "center" }}>
                Balance general
              </Typography>
            </Box>

            <Typography variant="h4" fontWeight="bold">
              {balance.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Grid de 2 columnas para los botones */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {buttons.map((btn) => (
          <Grid item xs={6} sm={6} md={3} key={btn.label}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate(btn.url)}
              sx={{
                height: 90,
                borderRadius: 3,
                flexDirection: "column",
                textTransform: "none",
                gap: 1,
              }}
            >
              <Box>{btn.icon}</Box>
              <Typography>{btn.label}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Cuentas del usuario */}
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
        <>
          <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
            Mis cuentas
          </Typography>
          <Grid container spacing={2}>
            {accounts.map((acc) => (
              <Grid item xs={12} sm={6} md={4} key={acc.id}>
                <AccountCard account={acc} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {!loading && accounts.length === 0 && !error && (
        <Typography color="textSecondary">
          No hay cuentas disponibles
        </Typography>
      )}
    </Box>
  );
}
