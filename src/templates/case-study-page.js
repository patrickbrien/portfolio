/* eslint-disable react/prop-types */

import React, { useContext } from "react";
import { graphql } from "gatsby";
import Div100vh from "react-div-100vh";
import Img from "gatsby-image";
import Layout from "~components/Layout";
import Header from "~components/Header";
import SEO from "~components/SEO";
import { DocumentContext } from "~context/DocumentContext";
import Nav from "~components/Nav";

const CaseStudyPage = ({ data, location }) => {
  const { device } = useContext(DocumentContext);
  const { frontmatter } = data.markdownRemark;

  //

  const navItems = JSON.parse(JSON.stringify(frontmatter.content));

  navItems.push({
    text: `Close`,
    marginTop: device === `desktop` ? 6 : 12,
    internalLink: `/`
  });

  navItems.push({
    text: `x`,
    serif: true,
    internalLink: `/`
  });

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

          <div
            className="grid"
            style={{
              height: device === `desktop` ? `calc(100vh - 172px)` : `auto`
            }}
          >
            {device !== `mobile` && (
              <section className="grid-end-4 grid-start-1 mt-6 flex flex-col">
                {frontmatter.content && <Nav items={navItems} />}
              </section>
            )}

            <section className="index-page__carousel h-auto overflow-scroll hide-scrollbar transform-center grid-end-4 grid-start-7 sm:grid-end-12 sm:grid-start-1 relative flex pb-12 sm:pb-6">
              <div className="w-full h-fit-content mt-8 sm:mt-4 relative">
                {frontmatter.images.map(({ image }) => {
                  return (
                    <Img
                      className="animation-fade-in-slow w-full mb-6 sm:mb-3 border-black"
                      fluid={image.childImageSharp.fluid}
                      alt="Case Study Image"
                    />
                  );
                })}
              </div>
            </section>

            {device === `mobile` && (
              <section className="grid-end-12 grid-start-1 mt-10 xs:mt-0 mb-12 flex flex-col">
                {frontmatter.content && <Nav items={navItems} />}
              </section>
            )}
          </div>
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
        content {
          text
          internalLink
          externalLink
          marginBottom
          marginTop
          serif
          token
          inline
        }
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
