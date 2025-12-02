export interface AccountViewModel {
  id: string;
  displayName: string;
  amountFormatted: string;
  ammount: number;
  atype: 'savings' | 'investment' | 'cash' | 'credit';
}

export interface TransactionViewModel {
  id: string;
  dateFormatted: string;
  description: string;
  amountFormatted: string;
  dtype: 'cargo' | 'abono';
}