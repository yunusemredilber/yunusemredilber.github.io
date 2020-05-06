require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    siteUrl: `https://yunusemre.dev`,
    siteTitle: 'Yunus Emre Dilber',
    siteTitleAlt: `Yunus Emre Dilber - Personal Blog`,
    siteHeadline: `Yunus Emre Dilber`,
    siteTitleAlt: `The blog of Yunus`,
    siteLanguage: `en`,
    author: `@yunusemredilber`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        navigation: [
          {
            title: `Blog [TR]`,
            slug: `/blog`,
          },
          {
            title: `Contact`,
            slug: `/contact`,
          },
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `https://twitter.com/yunusemredilber`,
          },
          {
            name: `Dev`,
            url: `https://dev.to/yunusemredilber`,
          },
          {
            name: `Github`,
            url: `https://github.com/yunusemredilber`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Yunus Emre Dilber - Personal Blog`,
        short_name: `Yunus Emre Dilber`,
        description: `Developer. I love to make beautiful and well-coded applications. Also, interested in compiler and interpreters.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /content/
        },
        props: {
          className: "my-class",
          title: "example"
        },
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
}
