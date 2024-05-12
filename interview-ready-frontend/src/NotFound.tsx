import React from "react";
import "./NotFound.css";
const NotFound: React.FC = () => {
  return (
    <div className="content">
      <h1 className="text" data-text="404">
        404
      </h1>
      <h2 className="subtitle">Page Not Found</h2>
      <p className="description">
        The page you are looking for <br />
        doesn't exist or changed or temporarily unavailable.
      </p>
      <a href="/signup" className="button">
        BACK TO HOME
      </a>
    </div>
  );
};

export default NotFound;
