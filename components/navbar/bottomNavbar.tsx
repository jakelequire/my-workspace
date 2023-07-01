'use clients';
import {useState, useEffect} from 'react';
import {usePageStateContext} from '../PageStateContext';
import useSessionState from '../useSessionState';
import Image from 'next/image';

import styles from './styles/bottomnavbar.module.css';
// SVGs
import _HOME from '@/public/assets/home.svg';
import _BANKING from '@/public/assets/banking.svg';
import _TODO from '@/public/assets/todo.svg';
import _STUDY from '@/public/assets/study.svg';
import _ANALYTICS from '@/public/assets/analytics.svg';
import _RESOURCES from '@/public/assets/resources.svg';
import _CALENDAR from '@/public/assets/calendar.svg';

export default function BottomNavbar(): JSX.Element {
	const [requestedPage, setRequestedPage] = useState<string>('home');
	const {setPage} = usePageStateContext();
	const {user, handleSignout} = useSessionState();

	const handleClick = (page: string) => {
		setRequestedPage(page);
	};

	useEffect(() => {
		if (user) {
			setPage(requestedPage);
		}
	}, [requestedPage]);

	return (
		<div className={styles.navbar}>
			{/* !!<== { Left Navbar } ==>!! */}
			<div className={styles.nav_left}>{/* <== Placeholder ==> */}</div>

			{/* !!<== { Center Navbar } ==>!! */}
			<div className={styles.nav_center}>
				<ol className={styles.center_items}>
					{/* <== Home ==> */}
					<li className={styles.list_items} data-active={requestedPage === 'home' ? 'true' : 'false'}>
						<div className={styles.item_wrapper}>
							<Image src={_HOME} height={22} width={22} alt='home' />
							<a
								className={styles.center_link}
								data-type='home'
								onClick={() => {
									handleClick('home');
								}}>
								Home
							</a>
						</div>
					</li>
					{/* <== Banking ==> */}
					<li className={styles.list_items} data-active={requestedPage === 'banking' ? 'true' : 'false'}>
						<div className={styles.item_wrapper}>
							<Image src={_BANKING} height={22} width={22} alt='Banking' />
							<a
								className={styles.center_link}
								data-type='banking'
								onClick={() => {
									handleClick('banking');
								}}>
								Banking
							</a>
						</div>
					</li>
					{/* <== Calendar ==> */}
					<li
						className={styles.list_items}
						data-active={requestedPage === 'calendar' ? 'true' : 'false'}>
						<div className={styles.item_wrapper}>
							<Image src={_CALENDAR} height={22} width={22} alt='Calendar' />
							<a
								className={styles.center_link}
								data-type='calendar'
								onClick={() => {
									handleClick('calendar');
								}}>
								Calendar
							</a>
						</div>
					</li>
					{/* <== To-Do ==> */}
					<li className={styles.list_items} data-active={requestedPage === 'todo' ? 'true' : 'false'}>
						<div className={styles.item_wrapper}>
							<Image src={_TODO} height={22} width={22} alt='To-Do' />
							<a
								className={styles.center_link}
								data-type='todo'
								onClick={() => {
									handleClick('todo');
								}}>
								To-Do
							</a>
						</div>
					</li>
					{/* <== Study ==> */}
					<li className={styles.list_items} data-active={requestedPage === 'study' ? 'true' : 'false'}>
						<div className={styles.item_wrapper}>
							<Image src={_STUDY} height={22} width={22} alt='Study' />
							<a
								className={styles.center_link}
								data-type='study'
								onClick={() => {
									handleClick('study');
								}}>
								Study
							</a>
						</div>
					</li>
					{/* <== Resources ==> */}
					<li
						className={styles.list_items}
						data-active={requestedPage === 'resources' ? 'true' : 'false'}>
						<div className={styles.item_wrapper}>
							<Image src={_RESOURCES} height={22} width={22} alt='Resources' />
							<a
								className={styles.center_link}
								data-type='resources'
								onClick={() => {
									handleClick('resources');
								}}>
								Resources
							</a>
						</div>
					</li>
					{/* <== Analytics ==> */}
					<li
						className={styles.list_items}
						data-active={requestedPage === 'analytics' ? 'true' : 'false'}>
						<div className={styles.item_wrapper}>
							<Image src={_ANALYTICS} height={22} width={22} alt='Analytics' />
							<a
								className={styles.center_link}
								data-type='analytics'
								onClick={() => {
									handleClick('analytics');
								}}>
								Analytics
							</a>
						</div>
					</li>
				</ol>
			</div>

			{/* !!<== { Right Navbar } ==>!! */}
			<div className={styles.nav_right}>{/* <== Placeholder ==> */}</div>
		</div>
	);
}
