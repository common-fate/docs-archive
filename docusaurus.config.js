// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const SLACK_URL =
  "https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg";

const previousRoutes = [
  "/common-fate/configuration/access-rules",
  "/common-fate/configuration/backup",
  "/common-fate/configuration/custom-domain",
  "/common-fate/configuration/deployment-yaml",
  "/common-fate/configuration/events",
  "/common-fate/configuration/logs",
  "/common-fate/configuration/slack",
  "/common-fate/configuration/updating",
  "/common-fate/configuration/users-and-groups",
  "/common-fate/configuration/waf",
  "/common-fate/deploying-granted/deploying-granted",
  "/common-fate/deploying-granted/prerequisites",
  "/common-fate/deploying-granted/setup",
  "/common-fate/deploying-granted/deploying",
  "/common-fate/deploying-granted/next-steps",
  "/common-fate/end-users/end-users",
  "/common-fate/providers/access-providers",
  "/common-fate/providers/add-first-provider/requesting-access",
  "/common-fate/providers/add-first-provider/clean-up",
  "/common-fate/providers/interactive-setup",
  "/common-fate/providers/registry/provider-registry",
  "/common-fate/providers/registry/commonfate/aws-sso/v2",
  "/common-fate/providers/registry/commonfate/azure-ad/v1",
  "/common-fate/providers/registry/commonfate/ecs-exec-sso/v1-alpha1",
  "/common-fate/providers/registry/commonfate/okta/v1",
  "/common-fate/security-architecture",
  "/common-fate/sso/sso-setup",
  "/common-fate/sso/aws-sso",
  "/common-fate/sso/azure",
  "/common-fate/sso/google",
  "/common-fate/sso/okta",
  "/common-fate/sso/onelogin",
  "/common-fate/sso/updating-configuration",
  "/common-fate/troubleshooting/aws-credentials",
];

const newRoutes = previousRoutes.map((a) =>
  a.replace("/common-fate/", "/common-fate/")
);

const rebrandRedirects = previousRoutes.map((r, i) => ({
  from: r,
  to: newRoutes[i],
}));

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
        id: "common-fate",
        path: "docs/common-fate",
        routeBasePath: "common-fate",
        sidebarPath: "./sidebars.approvals.js",
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html", "htm"], // /myPage.html -> /myPage
        redirects: [
          {
            from: "/granted",
            to: "/granted/introduction",
          },
          {
            from: "/common-fate",
            to: "/common-fate/introduction",
          },
          {
            from: "/common-fate",
            to: "/common-fate/introduction",
          },
          ...rebrandRedirects,
        ],
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
        style: "dark",
        items: [
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Granted",
          },
          {
            docsPluginId: "common-fate",
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Common Fate",
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
              {
                label: "Common Fate",
                to: "/common-fate/introduction",
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
              {
                label: "Telemetry",
                to: "/telemetry",
              },
              {
                label: "Privacy Policy",
                to: "/privacy-policy",
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
