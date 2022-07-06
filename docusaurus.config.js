// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const SLACK_URL =
  "https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Common Fate Documentation",
  staticDirectories: ["static"],
  tagline: "Identity-first cloud security for innovative teams",
  url: "https://docs.commonfate.io",
  baseUrl: "/",
  onBrokenLinks: "warn", // TODO: change to throw when launching
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "common-fate", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Bitter:wght@500&family=Rubik:wght@300;400;500",
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        path: "docs/granted",
        routeBasePath: "granted",
        sidebarPath: "./sidebars.granted.js",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "granted-approvals",
        path: "docs/approvals",
        routeBasePath: "granted-approvals",
        sidebarPath: "./sidebars.approvals.js",
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Docs",
        logo: {
          alt: "Common Fate",
          src: "img/logo.svg",
          href: "/granted/introduction",
        },
        items: [
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Granted CLI",
          },
          {
            docsPluginId: "granted-approvals",
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Granted Approvals",
          },
          {
            href: "https://granted.dev/cfcloud?ref=docs",
            label: "Common Fate Cloud",
            position: "left",
          },
          {
            href: "https://commonfate.io/blog",
            label: "Blog",
            position: "right",
          },
          {
            href: "https://github.com/common-fate",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Granted",
                to: "/granted/introduction",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Slack",
                href: SLACK_URL,
              },
              {
                label: "Twitter",
                href: "https://twitter.com/CommonFateTech",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                href: "https://commonfate.io/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/common-fate",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Common Fate.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
