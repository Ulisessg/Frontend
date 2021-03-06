import React, { useRef, useEffect } from "react";
import { TweenMax, Power3 } from "gsap";
import { Link } from "react-router-dom";

const MainTitle = () => {
  let titleWithAnimation = useRef(null);
  useEffect(() => {
    TweenMax.to(titleWithAnimation, 1, {
      opacity: 1,
      y: -20,
      ease: Power3.easeOut,
    });
  }, []);

  return (
    <>
      <div
        ref={(el) => {
          titleWithAnimation = el;
        }}
        className="main__container-login">
        <h1 className="main__title">News with automated web extraction</h1>
        <p className="main__title-description">
          We use Artificial Intelligence to classify the news according to its
          positivism or negativity
        </p>
        <Link to="/blog">
          <button aria-label="Learn more" className="main__btn" type="button">
            Learn more
          </button>
        </Link>
      </div>
    </>
  );
};

export default MainTitle;
