import style from './transactions.module.css'

const TransactionItem = ({ amount, title, subtitle, balance, type }) => (
    <li className={style.item}>
        <span className={style.itemtype}>
            {/* <Image src={type === 'Deposit' ? depositIcon : withdrawalIcon} height={40} width={40} alt={type} /> */}
        </span>
        <div className={style.description}>
            <h2 className={style.item_title}>{title}</h2>
            <p className={style.item_subtitle}>{subtitle}</p>
        </div>
        <div className={style.amount}>
            <p>{amount}</p>
        </div>
        <div className={style.balance}>
            <p>Balance: {balance}</p>
        </div>
    </li>
)

const Transactions = ({ transactions }) => (
    <div className={style.transactions_container}>
        <div className={style.transactions}>
            <div className={style.title}>
                <p className={style.header}>Recent Transactions</p>
            </div>
            <ol className={style.itemlist}>
                {exampleTransactions.map(transaction => <TransactionItem {...transaction} />)}
            </ol>
        </div>
    </div>
)

export default Transactions;

const exampleTransactions = [
    {
        amount: "+$100.00",
        title: "Deposit",
        subtitle: "From: John Doe",
        balance: "$100.00",
        type: "Deposit"
    },
    {
        amount: "+$100.00",
        title: "Deposit",
        subtitle: "From: John Doe",
        balance: "$200.00",
        type: "Deposit"
    },
    {
        amount: "-$50.00",
        title: "Withdrawal",
        subtitle: "To: Jane Doe",
        balance: "$150.00",
        type: "Withdrawal"
    },
    {
        amount: "+$100.00",
        title: "Deposit",
        subtitle: "From: John Doe",
        balance: "$250.00",
        type: "Deposit"
    },
]
