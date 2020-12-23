import { User, UserDTO } from './User';
export interface TransactionInterface {
  userFrom: User;
  userTo: User;
  transactionDate: Date;
  amount: number;
}
export class TransactionDTO implements TransactionInterface {
  userFrom: User = new User({} as UserDTO);
  userTo: User = new User({} as UserDTO);
  transactionDate: Date = new Date();
  amount = 0;

  createSubTypes(dto: TransactionDTO): void {
    this.userFrom = new User(dto.userFrom);
    this.userTo = new User(dto.userTo);
  }
}
export class Transaction extends TransactionDTO {
  constructor(dto: TransactionDTO) {
    super();
    Object.assign(this, dto);
    this.createSubTypes(dto);
  }
}
