import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import INPUT from "@/components/input";
import Trending from "@/components/trending";
import HeroCarousel from "@/components/carousel";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Cracking the&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>Saving&nbsp;</h1>
				<h1 className={title()}>Code</h1>
				<br />
				<h1 className={title()}>
					Uncover Hidden Deals
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Embark on a treasure hunt for exclusive deals and save like never before.
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					
					as={NextLink}
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Get API
				</Link>
				<Link
					isExternal
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>

			<div className="mt-8 mb-10">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<INPUT />
				</Snippet>
			</div>
				<HeroCarousel/>
			<Trending/>
		</section>
	);
}
