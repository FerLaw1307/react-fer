import React, { useState } from "react";
import { Typography, Box, TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountViewModel as UIAccountViewModel } from '../../components/account/accountDto';
import type { AccountType } from '../../components/account/accountDto';
import { useAccountsContext } from '../../contexts/AccountsContext';

export default function AccCreate() {
    const [displayName, setDisplayName] = useState("");
    const [ammount, setAmmount] = useState<number | "">("");
    const [atype, setAtype] = useState<AccountType>("savings");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const accountsCtx = useAccountsContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!displayName) {
            setError("El nombre de la cuenta es requerido");
            return;
        }
        const amt = typeof ammount === "number" ? ammount : Number(ammount);
        if (Number.isNaN(amt)) {
            setError("Monto inválido");
            return;
        }

        // Generar un id simple; puedes reemplazar por UUID si lo deseas
        const id = `acct-${Date.now()}`;

        const account = new UIAccountViewModel({
            id,
            name: displayName,
            type: atype,
            amount: amt,
        });

        // Añadir la cuenta al contexto y navegar a la página principal
        console.log('Cuenta creada:', account);
        accountsCtx.addAccount(account);
        navigate('/');
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Nueva Cuenta
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                p: 2
            }}>
                <TextField sx={{
                    flexBasis: {
                        xs: '100%',      // móvil: ancho completo
                        sm: 'calc(50% - 8px)',  // tablet: 2 columnas
                        md: 'calc(33.333% - 11px)', // desktop: 3 columnas
                    },
                    p: 0
                }}
                    label="Nombre de la cuenta"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                />

                <TextField sx={{
                    flexBasis: {
                        xs: '100%',      // móvil: ancho completo
                        sm: 'calc(50% - 8px)',  // tablet: 2 columnas
                        md: 'calc(33.333% - 11px)', // desktop: 3 columnas
                    },
                    p: 0
                }}

                    label="Monto inicial"
                    value={ammount}
                    onChange={(e) => setAmmount(e.target.value === "" ? "" : Number(e.target.value))}
                    required
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />

                <TextField sx={{
                    flexBasis: {
                        xs: '100%',      // móvil: ancho completo
                        sm: 'calc(50% - 8px)',  // tablet: 2 columnas
                        md: 'calc(33.333% - 11px)', // desktop: 3 columnas
                    },
                    p: 0
                }}
                    select label="Tipo de cuenta" value={atype} onChange={(e) => setAtype(e.target.value as AccountType)}>
                    <MenuItem value="savings">Ahorros</MenuItem>
                    <MenuItem value="investment">Inversiones</MenuItem>
                    <MenuItem value="cash">Efectivo</MenuItem>
                    <MenuItem value="credit">Crédito</MenuItem>
                </TextField>

                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}

                <Box sx={{
                    flexBasis: {
                        xs: '100%',      // móvil: ancho completo
                        sm: 'calc(50% - 8px)',  // tablet: 2 columnas
                        md: 'calc(33.333% - 11px)', // desktop: 3 columnas
                    },
                    p: 0,
                    display: 'flex', justifyContent: 'space-between'
                }}
                >
                    <Button type="submit" variant="contained">
                        Crear
                    </Button>
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
