import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCard from "../../components/account/account-card";
import { AccountViewModel } from "../../components/account/accountDto";

export default function Home() {
  const accounts: AccountViewModel[] = React.useMemo(
    () => [
      new AccountViewModel({ id: "1", name: "Cuenta A", type: "savings", amount: 1234.56 }),
      new AccountViewModel({ id: "2", name: "Inversiones B", type: "investment", amount: 9876.5 }),
      new AccountViewModel({ id: "3", name: "Efectivo", type: "cash", amount: 250 }),
      new AccountViewModel({ id: "4", name: "Tarjeta", type: "credit", amount: -120.75 }),
    ],
    []
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Mis cuentas
      </Typography>
      <Grid container spacing={2}>
        {accounts.map((acc) => (
          <Grid item xs={12} sm={6} md={4} key={acc.id}>
            <AccountCard account={acc} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
