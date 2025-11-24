export type AccountType =
  | "savings"
  | "investment"
  | "cash"
  | "credit"
  | "other";

export interface AccountDto {
  id: string;               // ID interno de tu sistema
  name: string;             // Nombre de la cuenta
  type: AccountType;        // Tipo de cuenta
  accountNumber?: string;   // Opcional
  amount: number;           // Monto actual
}

export class AccountViewModel {
  id: string;
  name: string;
  type: AccountType;
  accountNumber?: string;
  amount: number;

  constructor(init?: Partial<AccountViewModel>) {
    this.id = init?.id ?? "";
    this.name = init?.name ?? "";
    this.type = init?.type ?? "other";
    this.accountNumber = init?.accountNumber;
    this.amount = init?.amount ?? 0;
  }
}

