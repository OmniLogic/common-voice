import * as React from 'react';
import { useState } from 'react';
import { TextButton } from '../ui/ui';
import URLS from '../../urls';
import { trackGlobal } from '../../services/tracker';
import ContactModal from '../contact-modal/contact-modal';
import { useLocale, useLocalizedDiscourseURL } from '../locale-helpers';

interface SharedLinkProps {
  id?: string;
  children?: React.ReactNode;
  className?: string;
}

export const GitHubLink = ({ children, ...props }: SharedLinkProps) => {
  const [locale] = useLocale();
  return (
    <a
      href={URLS.GITHUB_ROOT}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackGlobal('github', locale)}
      {...props}>
      {children}
    </a>
  );
};

export const DiscourseLink = ({ children, ...props }: SharedLinkProps) => {
  const [locale] = useLocale();
  const discourseURL = useLocalizedDiscourseURL();
  return (
    <a
      href={discourseURL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackGlobal('discourse', locale)}
      {...props}>
      {children}
    </a>
  );
};

export const MatrixLink = ({ children, ...props }: SharedLinkProps) => {
  const [locale] = useLocale();
  return (
    <a
      href="https://chat.mozilla.org/#/room/#common-voice:mozilla.org"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackGlobal('matrix', locale)}
      {...props}>
      {children}
    </a>
  );
};

export const ContactLink = (props: SharedLinkProps) => {
  const [locale] = useLocale();
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
      {showContactModal && (
        <ContactModal onRequestClose={() => setShowContactModal(false)} />
      )}

      <TextButton
        {...props}
        onClick={() => {
          trackGlobal('contact', locale);
          setShowContactModal(true);
        }}
      />
    </>
  );
};
