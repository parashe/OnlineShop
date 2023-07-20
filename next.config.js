/** @type {import('next').NextConfig} */

module.exports = {
  publicRuntimeConfig: {
    site: {
      name: "Next.js + Tailwind CSS template",
    },
  },
  swcMinify: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
};
