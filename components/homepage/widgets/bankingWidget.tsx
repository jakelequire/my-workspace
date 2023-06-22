import Image from 'next/image';
import style from '../styles/widget.module.css';

import { Transactions } from './banking/transactions';

import _DOLLARSIGN from '@/public/assets/dollar.svg';

export default function BankingWidget(): JSX.Element {
	return (
		<main className={style.widget}>
			<div className={style.container}>
				<div className={style.title_container} data-type="banking">
					<Image src={_DOLLARSIGN} height={25} width={25} alt='alt' />
					<p className={style.title}>Banking</p>
					<div className={style.buttons_container}>
						<a className={style.button} data-type='move'></a>
						<a className={style.button} data-type='close'></a>
					</div>
				</div>


				<div className={style.center_container}>
                    <Transactions transactions={exampleTransactions}/>
                </div>

				<div className={style.footer_container}>
					<div className={style.footer}>
						<span className={style.btn}>
							<a className={style.footerBtn} data-type='history'>
								{' '}
							</a>
						</span>
						<span className={style.btn}>
							<a className={style.footerBtn} data-type='accounts'>
								{' '}
							</a>
						</span>
						<span className={style.btn}>
							<a className={style.footerBtn} data-type='graph'>
								{' '}
							</a>
						</span>
					</div>
				</div>
			</div>
		</main>
	);
}


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
  