import { useState, useEffect } from "react";
import { AccountViewModel } from "../components/account/accountDto";

/**
 * Hook para obtener la lista de cuentas del usuario
 * Realiza una petición HTTP al backend para obtener los datos
 * Por ahora utiliza un método dummy que simula la respuesta
 */
export function useAccounts() {
  const [accounts, setAccounts] = useState<AccountViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        // TODO: Reemplazar con llamada real al backend cuando esté disponible
        const data = await fetchAccountsFromBackend();
        setAccounts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar las cuentas");
        setAccounts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return { accounts, loading, error };
}

/**
 * Método dummy que simula una petición HTTP al backend
 * Reemplazar con la llamada real cuando el backend esté disponible
 */
async function fetchAccountsFromBackend(): Promise<AccountViewModel[]> {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  // TODO: Cuando el backend esté listo, reemplazar con:
  // const response = await fetch("/api/accounts");
  // const data = await response.json();
  // return data.map((acc: any) => new AccountViewModel(acc));

  // Datos dummy
  return [
    new AccountViewModel({ id: "1", name: "Cuenta A", type: "savings", amount: 1234.56 }),
    new AccountViewModel({ id: "2", name: "Inversiones B", type: "investment", amount: 9876.5 }),
    new AccountViewModel({ id: "3", name: "Efectivo", type: "cash", amount: 250 }),
    new AccountViewModel({ id: "4", name: "Tarjeta", type: "credit", amount: -120.75 }),
  ];
}
