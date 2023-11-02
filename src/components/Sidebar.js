"use client";

import Image from "next/image";
import HamburgerMenu from "public/hamburger-menu.svg";
import Dashboard from "public/dashboard.svg";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
	const [sidebar, setSidebar] = useState(false);
	const handleClick = () => {
		setSidebar(!sidebar);
		console.log(sidebar);
	};

	return (
		<div
			className={
				"h-full border-r relative transition-all duration-300 flex flex-col items-center overflow-hidden" +
				`${sidebar ? " w-80 " : " w-12 "}`
			}
		>
			<div className="absolute h-full top-0 right-0 p-3.5 bg-white">
				<Image
					src={HamburgerMenu}
					height={20}
					alt="hamburger-menu"
					onClick={handleClick}
					className={"hover:cursor-pointer"}
				/>
			</div>
			<div>SongRadar</div>
			<button>
				<Image src={Dashboard} height={20} alt="dashboard" />
			</button>
			<Link href="/auth/sign_in">Sign In</Link>
			<Link href="/auth/sign_up">Sign Up</Link>
		</div>
	);
}
