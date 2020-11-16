/* eslint-disable react/prop-types */
import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Nav from "~components/Nav";

const query = graphql`
  query HeaderNav {
    allDataYaml {
      edges {
        node {
          nav {
            columnOne {
              text
              internalLink
              externalLink
              marginBottom
              serif
              token
            }
            columnTwo {
              text
              internalLink
              externalLink
              marginBottom
              serif
              token
            }
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

const Header = ({ className, tokens }) => {
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
          <header className={className}>
            <div className="grid">
              {items.columnOne && (
                <Nav
                  items={items.columnOne}
                  className="grid-end-4 sm:grid-end-12 pr-4 sm:pr-0 sm:mb-3 flex flex-col"
                  tokens={tokens}
                />
              )}

              {items.columnTwo && (
                <Nav
                  items={items.columnTwo}
                  className="grid-end-4 sm:grid-end-12 pr-4 sm:pr-0 sm:mb-3 flex flex-col"
                  tokens={tokens}
                />
              )}

              {items.columnThree && (
                <Nav
                  items={items.columnThree}
                  className="sm:hidden grid-end-2 pr-2 flex flex-col"
                  tokens={tokens}
                />
              )}

              {items.columnFour && (
                <Nav
                  items={items.columnFour}
                  className="sm:hidden grid-end-2 flex flex-col"
                  tokens={tokens}
                />
              )}

              <div className="grid-end-12 border-b-black mt-8 sm:mt-1" />
            </div>
          </header>
        );
      }}
    />
  );
};

export default Header;