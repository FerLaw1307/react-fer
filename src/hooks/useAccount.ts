import { useMemo } from "react";
import { useAccountsContext } from "../contexts/AccountsContext";
import type { TransactionDto } from "../components/account/accountDto";

export function useAccount(accountId?: string) {
  const { accounts, updateAccount, addTransaction } = useAccountsContext();
  const account = useMemo(() => accounts.find((a) => a.id === accountId), [accounts, accountId]);

  const addTx = (tx: TransactionDto) => {
    if (!accountId) return;
    addTransaction(accountId, tx);
  };

  return { account, updateAccount, addTransaction: addTx };
}
