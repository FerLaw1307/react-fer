export type AccountType =
  | "savings"
  | "investment"
  | "cash"
  | "credit"
  | "other";

export type TransactionType = "abono" | "cargo";

export interface TransactionDto {
  id: string;
  type: TransactionType; // "abono" aumenta, "cargo" disminuye
  amount: number;
  date?: string;
  description?: string;
}

export interface AccountDto {
  id: string;               // ID interno de tu sistema
  name: string;             // Nombre de la cuenta
  type: AccountType;        // Tipo de cuenta
  accountNumber?: string;   // Opcional
  amount: number;           // Saldo inicial / apertura
  transactions?: TransactionDto[];
}

export class AccountViewModel {
  id: string;
  name: string;
  type: AccountType;
  accountNumber?: string;
  amount: number; // Saldo inicial
  transactions: TransactionDto[];

  constructor(init?: Partial<AccountViewModel>) {
    this.id = init?.id ?? "";
    this.name = init?.name ?? "";
    this.type = init?.type ?? "other";
    this.accountNumber = init?.accountNumber;
    this.amount = init?.amount ?? 0;
    this.transactions = init?.transactions ? [...init.transactions] : [];
  }

  // Calcula el balance actual: saldo inicial + (sum(abonos) - sum(cargos))
  getBalance(): number {
    const delta = this.transactions.reduce((acc, t) => {
      return acc + (t.type === "abono" ? t.amount : -t.amount);
    }, 0);
    return this.amount + delta;
  }

  // Devuelve una copia actualizada con la transacción agregada
  addTransaction(tx: TransactionDto): AccountViewModel {
    const copy = new AccountViewModel({ ...this });
    copy.transactions = [...this.transactions, tx];
    return copy;
  }
}

