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
                    <Transactions />
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
