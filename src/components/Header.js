/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import { StaticQuery, graphql } from "gatsby";
import { AppContext } from "~context/AppContext";
import Nav from "~components/Nav";
import { getRandomIntByRange } from "~utils/helpers";

const query = graphql`
  query HeaderNav {
    allDataYaml {
      edges {
        node {
          nav {
            currentlyLearning
            columnOne {
              text
              internalLink
              externalLink
              marginBottom
              marginTop
              serif
              token
              inline
            }
            columnTwo {
              text
              internalLink
              externalLink
              marginBottom
              marginTop
              serif
              token
              inline
            }
            columnThree {
              text
              internalLink
              externalLink
              marginBottom
              marginTop
              serif
              token
              inline
            }
            columnFour {
              text
              internalLink
              externalLink
              marginBottom
              marginTop
              serif
              token
              inline
            }
          }
        }
      }
    }
  }
`;

const Header = ({ className }) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const { setHeaderHeight } = useContext(AppContext);
        const { allDataYaml } = data;

        const { node: selectedNode } = allDataYaml.edges.find(
          ({ node }) => node.nav
        );
        const { nav: items } = selectedNode;

        const [currentlyLearning, setCurrentlyLearning] = useState(``);
        const [tokens, setTokens] = useState({});

        useEffect(() => {
          const learningArray = items.currentlyLearning.split(`,`);
          const learningIndex = getRandomIntByRange(
            0,
            learningArray.length - 1
          );

          setCurrentlyLearning(learningArray[learningIndex].trim());
        }, []);

        useEffect(() => {
          setTokens({ CURRENTLY_LEARNING: currentlyLearning });
        }, [currentlyLearning]);

        return (
          <header style={{ minHeight: `172px` }} className={className}>
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
