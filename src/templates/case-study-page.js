/* eslint-disable react/prop-types */

import React, { useContext } from "react";
import { graphql } from "gatsby";
import Div100vh from "react-div-100vh";
import Img from "gatsby-image";
import Layout from "~components/Layout";
import Header from "~components/Header";
import Footer from "~components/Footer";
import SEO from "~components/SEO";
import { DocumentContext } from "~context/DocumentContext";

const CaseStudyPage = ({ data, location }) => {
  const { device } = useContext(DocumentContext);
  const { frontmatter } = data.markdownRemark;

  //

  return (
    <>
      <SEO
        customTitle={frontmatter.title}
        customDescription={frontmatter.seoDescription}
        customKeywords={frontmatter.seoKeywords}
        path={location.pathname}
      />

      <Layout className="case-study-page w-full relative">
        <Div100vh className="relative overflow-hidden sm:overflow-scroll">
          <Header className="text-off-black mt-4" />

          <div className="grid h-full">
            <section className="index-page__carousel h-auto overflow-scroll transform-center grid-end-4 grid-start-7 sm:grid-end-12 sm:grid-start-1 relative flex pb-12 sm:pb-6">
              <div className="w-full h-fit-content mt-10 sm:mt-4 relative border-black">
                {frontmatter.images.map(({ image }) => {
                  return (
                    <Img
                      className="animation-fade-in-slow w-full"
                      fluid={image.childImageSharp.fluid}
                      alt="Carousel Image Active"
                    />
                  );
                })}
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

export default CaseStudyPage;

export const query = graphql`
  query CaseStudyPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        seoDescription
        seoKeywords
        images {
          image {
            childImageSharp {
              fluid(maxWidth: 1440, quality: 75) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`;
