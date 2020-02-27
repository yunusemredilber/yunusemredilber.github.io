/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Footer = () => {

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
        mt: [6],
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        variant: `dividers.top`,
      }}
    >
      <div>
        &copy; {new Date().getFullYear()} by {` `}
        <Styled.a aria-label="Link to the my Github Profile"
         target="_blank"
         href="https://github.com/yunusemredilber">
          Yunus Emre Dilber
        </Styled.a>
      </div>
      <div>
        <Styled.a
          aria-label="Link to the theme's GitHub repository"
          href="https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-minimal-blog"
        >
          Theme
        </Styled.a>
        {` `}
        by
        {` `}
        <Styled.a aria-label="Link to the theme author's website" href="https://www.lekoarts.de/en">
          LekoArts
        </Styled.a>
      </div>
    </footer>
  )
}

export default Footer;
