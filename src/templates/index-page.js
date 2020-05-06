/* eslint-disable react/prop-types */

import React, { Component, useContext } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { AppContext } from "~context/AppContext";
import { CursorContext } from "~context/CursorContext";
import Layout from "~components/Layout";
import SEO from "~components/SEO";

class IndexPageComponent extends Component {
  state = {
    imageIndex: 0
  };

  imageInterval;

  componentDidMount() {
    const { frontmatter } = this.props;
    const carouselImageLength = frontmatter.carouselImages.length;

    this.imageInterval = setInterval(() => {
      this.setState(prevState => ({
        imageIndex:
          prevState.imageIndex + 1 < carouselImageLength
            ? prevState.imageIndex + 1
            : 0
      }));
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.imageInterval);
  }

  //

  render() {
    // const { cursorContext, frontmatter, location } = this.props;
    const { frontmatter, location } = this.props;
    const { imageIndex } = this.state;

    const activeImage = frontmatter.carouselImages[imageIndex];

    let nextImage = frontmatter.carouselImages[0];

    if (imageIndex < frontmatter.carouselImages.length) {
      nextImage = frontmatter.carouselImages[imageIndex + 1];
    }

    // const imageTranslate = `translate3d(${cursorContext.cursorCenterDeltaX *
    //   10}px, ${cursorContext.cursorCenterDeltaY * 10}px, 0)`;

    return (
      <>
        <SEO
          customTitle={frontmatter.title}
          customDescription={frontmatter.seoDescription}
          customKeywords={frontmatter.seoKeywords}
          path={location.pathname}
        />

        <Layout className="index-page w-full h-screen relative">
          <div className="h-full grid">
            <nav className="h-full grid-end-5 relative flex flex-col justify-between pt-8 pb-12">
              <article>
                <h1 className="f1">Patrick Brien</h1>
                <h2 className="f1">Digital Branding</h2>
                <h2 className="f1">and Website Design</h2>

                <h2 className="mt-16 f1">Currently learning: AUSLAN</h2>
              </article>

              <ul className="flex">
                <li className="relative mr-1 f1 text-black">
                  <a
                    className="hover-underline"
                    href="mailto:hello@patrickbrien.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Email,
                  </a>
                </li>

                <li className="relative mr-1 f1 text-black">
                  <a
                    className="hover-underline"
                    href="https://www.instagram.com/patrickbrien/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram,
                  </a>
                </li>

                <li className="relative f1 text-black">
                  <a
                    className="hover-underline"
                    href="https://open.spotify.com/user/pbrien1?si=wykLl5prRmqAc96mUbUXGw"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Spotify
                  </a>
                </li>
              </ul>
            </nav>

            <section className="grid-end-7 relative flex items-end pb-12">
              <div
                className="index-page__glide w-full relative overflow-hidden"
                // style={{ transform: imageTranslate }}
              >
                {activeImage && (
                  <Img
                    className="animation-fade-in-slow w-full absolute transform-center z-10"
                    fluid={activeImage.childImageSharp.fluid}
                    alt="Carousel Image Active"
                  />
                )}

                {nextImage && (
                  <Img
                    className="animation-fade-in-slow animation-delay-1 w-full absolute transform-center"
                    fluid={activeImage.childImageSharp.fluid}
                    alt="Carousel Image Cached"
                  />
                )}
              </div>
            </section>
          </div>
        </Layout>
      </>
    );
  }
}

//

const IndexPage = ({ data, location }) => {
  const appContext = useContext(AppContext);
  const cursorContext = useContext(CursorContext);
  const { frontmatter } = data.markdownRemark;

  return (
    <IndexPageComponent
      appContext={appContext}
      cursorContext={cursorContext}
      frontmatter={frontmatter}
      location={location}
    />
  );
};

export default IndexPage;

export const query = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        carouselImages {
          childImageSharp {
            fluid(maxWidth: 1440, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        seoDescription
        seoKeywords
      }
    }
  }
`;