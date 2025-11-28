import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AccountViewModel } from "./accountDto";

type Props = { account: AccountViewModel };

const typeColors: Record<string, string> = {
  savings: "#4caf50",
  investment: "#2196f3",
  cash: "#ff9800",
  credit: "#f44336",
  other: "#9e9e9e",
};

export default function AccountCard({ account }: Props) {
  const formatted = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
    account.amount
  );
  const initials = (account.name || "").split(" ").map((n) => n[0]).slice(0, 2).join("");
  const bg = typeColors[account.type] ?? typeColors.other;

  return (
    <Card sx={{ borderRadius: 4, borderColor: bg, borderWidth: 2, borderStyle: 'solid' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: bg }}>{initials}</Avatar>}
        title={account.name}
        subheader={account.accountNumber ?? account.type}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{formatted}</Typography>
          <Typography variant="caption" color="text.secondary">
            {account.type}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
