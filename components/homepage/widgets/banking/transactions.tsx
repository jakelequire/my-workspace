import style from "./transactions.module.css";

interface ReceivablesProps {
  amount: string;
  title: string;
  subtitle: string;
  balance: string;
  type: "Deposit" | "Withdrawal";
}

interface TransactionsProps {
  transactions: ReceivablesProps[];
}

const TransactionItem = ({
  amount,
  title,
  subtitle,
  balance,
  type,
}: ReceivablesProps) => (
  <li className={style.item}>
    <span className={style.itemtype}>
      {/* <Image src={type === 'Deposit' ? depositIcon : withdrawalIcon} height={40} width={40} alt={type} /> */}
    </span>
    <div className={style.description}>
      <h2 className={style.item_title}>{title}</h2>
      <p className={style.item_subtitle}>{subtitle}</p>
    </div>
    <div className={style.transaction_container}>
      <div
        className={`${style.amount} ${
          type === "Deposit" ? style.deposit : style.withdrawal
        }`}
      >
        <p>{amount}</p>
      </div>
      <div className={style.balance}>
        <p>Balance: {balance}</p>
      </div>
    </div>
  </li>
);

export const Transactions = ({ transactions }: TransactionsProps) => (
  <div className={style.transactions_container}>
    <div className={style.transactions}>
      <div className={style.title}>
        <p className={style.header}>Recent Transactions</p>
        <a className={style.header_link}> View All</a>
      </div>
      <ol className={style.itemlist}>
        {exampleTransactions.map((transaction) => (
          <TransactionItem key={transaction.subtitle} {...transaction} />
        ))}
      </ol>
    </div>
  </div>
);

export const RecentPayments = ({ transactions }: TransactionsProps) => (
  <div className={style.transactions_container}>
    <div className={style.transactions}>
      <div className={style.title}>
        <p className={style.header}>Recent Payments</p>
        <a className={style.header_link}> View All</a>
      </div>
      <ol className={style.itemlist}>
        {exampleTransactions.map((transaction) => (
          <TransactionItem key={transaction.subtitle} {...transaction} />
        ))}
      </ol>
    </div>
  </div>
);

const exampleTransactions = [
  {
    amount: "+ $100.00",
    title: "Deposit",
    subtitle: "From: John Doe",
    balance: "$100.00",
    type: "Deposit",
  },
  {
    amount: "+ $100.00",
    title: "Deposit",
    subtitle: "From: Ann Doe",
    balance: "$200.00",
    type: "Deposit",
  },
  {
    amount: "- $50.00",
    title: "Withdrawal",
    subtitle: "To: Jane Doe",
    balance: "$150.00",
    type: "Withdrawal",
  },
  {
    amount: "+ $100.00",
    title: "Deposit",
    subtitle: "From: Bob Doe",
    balance: "$250.00",
    type: "Deposit",
  },
];
