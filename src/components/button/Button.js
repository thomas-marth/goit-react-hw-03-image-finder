import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";

const Button = ({ onClick }) => {
  return (
    <div>
      <button type="button" onClick={onClick} className={styles.Button}>
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
