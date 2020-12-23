import { User, UserDTO } from './User';
import { Context, ContextDTO } from './Context';
import { Transaction } from './Transaction';
export interface ExpensePairInterface {
  id: string;
  attendeeOne: User;
  attendeeTwo: User;
  userFromDiff: number;
  context: Context;
  transaction: Transaction[];
  lastTransactionDate: Date;
}
export class ExpensePairDTO implements ExpensePairInterface {
  id = '';
  attendeeOne: User = new User({} as UserDTO);
  attendeeTwo: User = new User({} as UserDTO);
  userFromDiff = 0;
  context: Context = new Context({} as ContextDTO);
  transaction: Transaction[] = [];
  lastTransactionDate: Date = new Date(2000, 1);

  createSubTypes(dto: ExpensePairDTO): void {
    this.attendeeOne = new User(dto.attendeeOne);
    this.attendeeTwo = new User(dto.attendeeTwo);
    this.context = new Context(dto.context);
    this.lastTransactionDate = new Date(dto.lastTransactionDate);
    this.transaction = [] as Transaction[];
    if (dto.transaction && dto.transaction.length > 0) {
      for (const transactionDto of dto.transaction) {
        this.transaction.push(new Transaction(transactionDto));
      }
    }
  }
}

export class ExpensePair extends ExpensePairDTO {
  constructor(dto: ExpensePairDTO) {
    super();
    Object.assign(this, dto);
    this.createSubTypes(dto);
  }
}
