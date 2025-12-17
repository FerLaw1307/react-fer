import React, { createContext, useContext, useEffect, useState } from 'react';
import { AccountViewModel } from '../components/account/accountDto';
import { useAccounts as useAccountsHook } from '../hooks/useAccounts';

type AccountsContextValue = {
  accounts: AccountViewModel[];
  loading: boolean;
  error: string | null;
  addAccount: (acc: AccountViewModel) => void;
  setAccounts: (accs: AccountViewModel[]) => void;
  updateAccount: (acc: AccountViewModel) => void;
  addTransaction: (accountId: string, tx: import("../components/account/accountDto").TransactionDto) => void;
};

const AccountsContext = createContext<AccountsContextValue | undefined>(undefined);

export const AccountsProvider = ({ children }: { children?: React.ReactNode }) => {
  // Reuse existing hook to fetch initial data (dummy for now)
  const { accounts: fetched, loading, error } = useAccountsHook();
  const [accounts, setAccounts] = useState<AccountViewModel[]>([]);

  useEffect(() => {
    setAccounts(fetched);
  }, [fetched]);

  const addAccount = (acc: AccountViewModel) => {
    setAccounts((prev) => [acc, ...prev]);
  };

  const updateAccount = (acc: AccountViewModel) => {
    setAccounts((prev) => prev.map((a) => (a.id === acc.id ? acc : a)));
  };

  const addTransaction = (accountId: string, tx: import("../components/account/accountDto").TransactionDto) => {
    setAccounts((prev) => {
      return prev.map((a) => {
        if (a.id !== accountId) return a;
        return a.addTransaction(tx);
      });
    });
  };

  const value: AccountsContextValue = {
    accounts,
    loading,
    error,
    addAccount,
    setAccounts,
    updateAccount,
    addTransaction,
  };

  return <AccountsContext.Provider value={value}>{children}</AccountsContext.Provider>;
};

export function useAccountsContext() {
  const ctx = useContext(AccountsContext);
  if (!ctx) throw new Error('useAccountsContext must be used within AccountsProvider');
  return ctx;
}

export default AccountsContext;
