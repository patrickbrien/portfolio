/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "gatsby";

const Nav = ({ items, tokens, className }) => {
  const parseItem = ({
    serif,
    text,
    token,
    internalLink,
    externalLink,
    marginBottom,
    inline,
    marginTop
  }) => {
    const content = tokens && token ? tokens[token] : text;

    return (
      <div
        className={`${marginBottom ? `mb-${marginBottom}` : ``} ${
          marginTop ? `mt-${marginTop}` : ``
        } ${serif ? `f1--serif` : `f1`}`}
        style={{ display: inline ? `inline` : `block` }}
      >
        {internalLink && <Link to={internalLink}>{content}</Link>}

        {!internalLink && externalLink && (
          <a href={externalLink} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        )}

        {!internalLink && !externalLink && content}
      </div>
    );
  };

  const parseItems = (column, listClassName) => (
    <ul className={listClassName}>
      {column.map(item => {
        const key = item.text || item.token;
        return (
          <li
            className="w-full"
            style={{ display: item.inline ? `inline` : `block` }}
            key={key}
          >
            {parseItem(item)}
          </li>
        );
      })}
    </ul>
  );

  return parseItems(items, className);
};

export default Nav;
