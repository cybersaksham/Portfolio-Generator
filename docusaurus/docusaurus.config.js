// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/palenight");
const darkCodeTheme = require("prism-react-renderer/themes/nightOwl");

const appData = require("./appdata.config.json");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: appData.appName,
  tagline: appData.description,
  url: appData.website,
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: appData.author, // Usually your GitHub org/user name.
  projectName: appData.repository, // Usually your repo name.
  deploymentBranch: appData.deploymentBranch,
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.json"),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-pwa",
      {
        debug: false,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
          "mobile",
        ],
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "/img/icons/500x500.png",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.json",
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "rgb(37, 194, 160)",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-status-bar-style",
            content: "#000",
          },
          {
            tagName: "link",
            rel: "apple-touch-icon",
            href: "/img/icons/500x500.png",
          },
          {
            tagName: "link",
            rel: "mask-icon",
            href: "/img/icons/500x500.png",
            color: "rgb(62, 204, 94)",
          },
          {
            tagName: "meta",
            name: "msapplication-TileImage",
            content: "/img/icons/500x500.png",
          },
          {
            tagName: "meta",
            name: "msapplication-TileColor",
            content: "#000",
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: "Q65KXJLU8N",
        apiKey: "fd5b8be15d9e9c16d13224de912ef83a",
        indexName: "portfolio-generator",
      },
      metadata: appData.metadata,
      navbar: {
        title: appData.appName,
        logo: {
          alt: `${appData.appName} Logo`,
          src: "img/icons/500x500.png",
        },
        items: [
          { to: appData.docURL, label: "Docs", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: appData.githubURL,
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: appData.docURL,
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: `https://stackoverflow.com/questions/tagged/${appData.repository}`,
              },
              // {
              //   label: "Discord",
              //   href: "https://discordapp.com/invite/portfolio-generator",
              // },
              // {
              //   label: "Twitter",
              //   href: "https://twitter.com/cybersaksham",
              // },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: appData.githubURL,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ${
          appData.appName
        }, Inc. Built by ${appData.author}.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
