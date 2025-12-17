import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAccount } from "../../hooks/useAccount";
import type { TransactionDto } from "../../components/account/accountDto";
import { Box, Typography, Card, CardContent, TextField, MenuItem, Button, List, ListItem, ListItemText } from "@mui/material";

export default function AccountDetail() {
  const { id } = useParams();
  const { account, addTransaction } = useAccount(id);

  const [type, setType] = useState<TransactionDto["type"]>("abono");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  if (!account) {
    return <Typography>Cuenta no encontrada</Typography>;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    const tx: TransactionDto = {
      id: `${Date.now()}`,
      type,
      amount,
      date: new Date().toISOString(),
      description,
    };
    addTransaction(tx);
    setAmount(0);
    setDescription("");
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{account.name}</Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1">Número: {account.accountNumber ?? "-"}</Typography>
          <Typography variant="h5">Saldo: {account.getBalance().toLocaleString("es-MX", { style: "currency", currency: "MXN" })}</Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <form onSubmit={onSubmit} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField select label="Tipo" value={type} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value as TransactionDto['type'])} size="small">
              <MenuItem value="abono">Abono</MenuItem>
              <MenuItem value="cargo">Cargo</MenuItem>
            </TextField>
            <TextField label="Cantidad" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} size="small" />
            <TextField label="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} size="small" />
            <Button type="submit" variant="contained">Agregar</Button>
          </form>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>Transacciones</Typography>
      <List>
        {account.transactions && account.transactions.length > 0 ? (
          account.transactions.slice().reverse().map((tx) => (
            <ListItem key={tx.id}>
              <ListItemText primary={`${tx.type === 'abono' ? '+' : '-'} ${tx.amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`} secondary={`${tx.description ?? ''} — ${new Date(tx.date ?? '').toLocaleString()}`} />
            </ListItem>
          ))
        ) : (
          <Typography color="textSecondary">No hay transacciones</Typography>
        )}
      </List>
    </Box>
  );
}
