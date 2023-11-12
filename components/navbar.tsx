"use client"

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
// import { useClerk } from "@clerk/clerk-react";
import { ThemeSwitch } from "@/components/theme-switch";


import { Heart, BellDot } from 'lucide-react';
import { useAuth, UserButton } from "@clerk/nextjs";


export const Navbar = () => {
	const { userId } = useAuth()
	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<Link className="flex justify-start items-center gap-1" href="/">
						{/* <Logo /> */}
						<p className="font-bold text-2xl font text-slate-600">DealDetective</p>
					</Link>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<Button variant="flat"><ThemeSwitch /></Button>
				</NavbarItem>
				<NavbarItem className="hidden md:flex">
					<Link href="/" aria-label="Like">
						<Heart color="#ff0033" />
					</Link>
				</NavbarItem>
				<NavbarItem className="hidden md:flex">
					<Link href="/" aria-label="Like">
						<BellDot color="#a5a1a1" />
					</Link>
				</NavbarItem>
				{!userId ? <> <NavbarItem>
					<Button as={Link} color="primary" href="/auth/sign-up" variant="flat">
						Sign Up
					</Button>
				</NavbarItem>
					<NavbarItem>
						<Button as={Link} color="warning" href="/auth/sign-in" variant="flat">
							Sign In
						</Button>
					</NavbarItem></> : <UserButton afterSignOutUrl="/" />}
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<Button variant="flat"><ThemeSwitch /></Button>
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					<UserButton afterSignOutUrl="/" />
					{siteConfig.navMenuItems.map((item, index) => {
						if (userId && (index === 2 || index === 3)) {
							return null; // Skip rendering items at index 2 and 3 if userId exists
						}
						return (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									color={index === 2 || index === 3 ? "primary" : "foreground"}
									href={item.href}
									size="lg"
								>
									{item.label}
								</Link>
							</NavbarMenuItem>
						);
					})}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
