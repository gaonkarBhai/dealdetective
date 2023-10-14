export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Deal Detective",
  description: "Unlock the Secrets of Savings: Journey with Deal Detective",
  navItems: [
    // {
    //   label: "Get Api",
    //   href: "/",
    // },
  ],
  navMenuItems: [
    {
      label: "Favorites",
      href: "/favorites",
    },
    {
      label: "Notification",
      href: "/notification",
    },
    {
      label: "Sign In",
      href: "/auth/sign-in",
    },
    {
      label: "Sign Up",
      href: "/auth/sign-up",
    },
  ],
  links: {
    github: "https://github.com/gaonkarBhai/",
    twitter: "https://twitter.com/getnextui",
    docs: "/",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
