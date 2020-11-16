/* eslint-disable react/prop-types */
import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Nav from "~components/Nav";

const query = graphql`
  query FooterNav {
    allDataYaml {
      edges {
        node {
          nav {
            columnThree {
              text
              internalLink
              externalLink
              marginBottom
              serif
              token
            }
            columnFour {
              text
              internalLink
              externalLink
              marginBottom
              serif
              token
            }
          }
        }
      }
    }
  }
`;

const Footer = ({ className, tokens }) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const { allDataYaml } = data;

        const { node: selectedNode } = allDataYaml.edges.find(
          ({ node }) => node.nav
        );
        const { nav: items } = selectedNode;

        return (
          <footer className={className}>
            <div className="grid">
              {items.columnThree && (
                <Nav
                  items={items.columnThree}
                  className="grid-end-6 pr-2 flex flex-col"
                  tokens={tokens}
                />
              )}

              {items.columnFour && (
                <Nav
                  items={items.columnFour}
                  className="grid-end-6 flex flex-col"
                  tokens={tokens}
                />
              )}
            </div>
          </footer>
        );
      }}
    />
  );
};

export default Footer;
