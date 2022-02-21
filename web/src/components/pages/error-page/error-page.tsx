import * as React from 'react';
import { useEffect } from 'react';
import { Localized } from '@fluent/react';

import { trackError } from '../../../services/tracker';
import { LocaleLink } from '../../locale-helpers';
import { GitHubLink, DiscourseLink, MatrixLink } from '../../shared/links';
import { GithubIconCode, DiscourseIconCode, MatrixIcon } from '../../ui/icons';

import './error-page.css';
import VisuallyHidden from '../../visually-hidden/visually-hidden';

const ErrorPage = ({
  errorCode,
  prevPath = '',
}: {
  errorCode: '404' | '503';
  prevPath: string;
}) => {
  useEffect(() => {
    trackError(errorCode, prevPath);
  }, []);

  return (
    <div className="error-page">
      <div className="error-page-container-inner">
        <div className="error-page-container-text">
          <Localized id={`error-title-${errorCode}`}>
            {/* Localized injects content into child tag */}
            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
            <h1 />
          </Localized>
          <Localized id="error-code" vars={{ code: errorCode }}>
            <p className="error-code" />
          </Localized>
          <Localized
            id={`error-content-${errorCode}`}
            elems={{
              homepageLink: <LocaleLink to="" />,
              matrixLink: <MatrixLink />,
              githubLink: <GitHubLink />,
              discourseLink: <DiscourseLink />,
            }}>
            <p className="error-content" />
          </Localized>
          <div className="get-involved-icons">
            <DiscourseLink className="round-button">
              <VisuallyHidden>Discourse</VisuallyHidden>
              <DiscourseIconCode />
            </DiscourseLink>
            <GitHubLink className="round-button">
              <VisuallyHidden>GitHub</VisuallyHidden>
              <GithubIconCode />
            </GitHubLink>
            <MatrixLink className="round-button">
              <VisuallyHidden>Matrix</VisuallyHidden>
              <MatrixIcon />
            </MatrixLink>
          </div>
        </div>
        <img alt="" className="mars" src={require('./images/mars-frown.svg')} />
      </div>
    </div>
  );
};

export default ErrorPage;
