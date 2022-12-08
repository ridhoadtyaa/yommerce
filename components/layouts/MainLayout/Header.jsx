import Link from 'next/link';
import { useRouter } from 'next/router';
import useIsSSR from '../../../hooks/useIsSSR.js';
import { Menu, Transition } from '@headlessui/react';
import { PrimaryButton } from '../../button';
import { Fragment } from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../features/authSlice';
import { useState } from 'react';

const Header = () => {
	const user = useSelector(state => state.user.user);
	const isSSR = useIsSSR();
	const router = useRouter();

	const dispatch = useDispatch();

	const [isNavOpen, setIsNavOpen] = useState(false);
	const genericHamburgerLine = `h-[2px] w-5 rounded-full bg-black transition ease transform duration-300`;

	return (
		<header className="fixed z-50 w-full bg-white">
			<nav className="layout relative flex items-center justify-between border-b border-black py-3">
				<h3 className="text-xl md:text-2xl">
					<Link href="/">yommerce</Link>
				</h3>
				<button className="group flex flex-col items-center justify-center space-y-1 md:hidden" onClick={() => setIsNavOpen(prev => !prev)}>
					<div className={`${genericHamburgerLine} ${isNavOpen ? 'translate-y-2 rotate-45 group-hover:opacity-100' : 'group-hover:opacity-100'}`} />
					<div className={`${genericHamburgerLine} ${isNavOpen ? 'opacity-0' : 'group-hover:opacity-100'}`} />
					<div className={`${genericHamburgerLine} ${isNavOpen ? '-translate-y-1 -rotate-45 group-hover:opacity-100' : 'group-hover:opacity-100'}`} />
				</button>
				<div
					className={`absolute top-14 right-0 w-full max-w-[10rem] flex-col items-center justify-center rounded-md bg-white p-5 shadow-lg md:static md:w-full md:max-w-none md:flex-row md:p-0 md:shadow-none ${
						isNavOpen ? 'flex' : 'hidden'
					} md:flex md:h-0 md:items-center md:justify-between`}
				>
					<ul className="flex flex-col items-center space-y-4 md:ml-10 md:flex-row md:space-x-4 md:space-y-0">
						<li>
							<Link href="/products" className={`${router.pathname.startsWith('/products') && 'font-semibold'}`}>
								Products
							</Link>
						</li>
						<li>
							<Link href="/about" className={`${router.pathname === '/about' && 'font-semibold'}`}>
								About
							</Link>
						</li>
						<li>
							<Link href="/cart" className={`${router.pathname === '/cart' && 'font-semibold'}`}>
								Cart
							</Link>
						</li>
					</ul>
					<div className="mt-4 md:mt-0 md:w-28 md:text-end">
						{!isSSR &&
							(user ? (
								<Menu as="div" className="relative">
									<Menu.Button>Hi, {user.name.firstname}</Menu.Button>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute top-12 right-0">
											<Menu.Item>
												<PrimaryButton className="flex items-center" onClick={() => dispatch(logoutUser())}>
													Logout <RiLogoutCircleRLine size={16} className="ml-1" />
												</PrimaryButton>
											</Menu.Item>{' '}
										</Menu.Items>
									</Transition>
								</Menu>
							) : (
								<Link href="/login" className="rounded-md bg-black px-3 py-2 text-sm text-white transition duration-300 hover:opacity-70">
									Login
								</Link>
							))}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
