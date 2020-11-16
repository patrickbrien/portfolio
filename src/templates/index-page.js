/* eslint-disable react/prop-types */

import React, { useEffect, useState, useContext } from "react";
import { graphql } from "gatsby";
import Div100vh from "react-div-100vh";
import Img from "gatsby-image";
import Layout from "~components/Layout";
import Header from "~components/Header";
import Footer from "~components/Footer";
import SEO from "~components/SEO";
import { DocumentContext } from "~context/DocumentContext";
import { getRandomIntByRange } from "~utils/helpers";

const IndexPage = ({ data, location }) => {
  const { device } = useContext(DocumentContext);
  const { frontmatter } = data.markdownRemark;
  const [imageIndex, setImageIndex] = useState(0);
  const [currentlyLearning, setCurrentlyLearning] = useState(``);

  useEffect(() => {
    const carouselImageLength = frontmatter.carouselImages.length;

    const imageInterval = setInterval(() => {
      setImageIndex(
        prevImageIndex => (prevImageIndex + 1) % carouselImageLength
      );
    }, 5000);

    const learningArray = frontmatter.currentlyLearning.split(`,`);
    const learningIndex = getRandomIntByRange(0, learningArray.length - 1);

    setCurrentlyLearning(learningArray[learningIndex].trim());

    return () => clearInterval(imageInterval);
  }, []);

  //

  const activeImage = frontmatter.carouselImages[imageIndex];

  return (
    <>
      <SEO
        customTitle={frontmatter.title}
        customDescription={frontmatter.seoDescription}
        customKeywords={frontmatter.seoKeywords}
        path={location.pathname}
      />

      <Layout className="index-page w-full relative">
        <Div100vh className="relative overflow-hidden sm:overflow-scroll">
          <Header
            className="text-off-black mt-4"
            tokens={{ CURRENTLY_LEARNING: currentlyLearning }}
          />

          <div className="grid">
            <section className="grid-end-4 grid-start-7 sm:grid-end-12 sm:grid-start-1 relative flex pb-12 sm:pb-6">
              <div className="index-page__carousel w-full h-fit-content mt-10 sm:mt-4 relative border-black">
                {activeImage && (
                  <Img
                    className="animation-fade-in-slow w-full"
                    fluid={activeImage.childImageSharp.fluid}
                    alt="Carousel Image Active"
                  />
                )}
              </div>
            </section>
          </div>

          {device === `mobile` && <Footer className="w-full mb-4" />}
        </Div100vh>
      </Layout>
    </>
  );
};

//

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
        currentlyLearning
        seoDescription
        seoKeywords
      }
    }
  }
`;
