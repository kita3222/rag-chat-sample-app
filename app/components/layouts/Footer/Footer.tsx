import React from "react";
import styled from "styled-components";

interface FooterProps {
  companyName?: string;
  showVersion?: boolean;
  version?: string;
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-6);
  background-color: var(--color-white);
  border-top: var(--border-width-thin) solid var(--color-gray-200);
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: var(--space-3);
    gap: var(--space-3);
  }
`;

const Copyright = styled.div`
  display: flex;
  align-items: center;
`;

const Links = styled.div`
  display: flex;
  gap: var(--space-4);

  @media (max-width: 768px) {
    gap: var(--space-3);
  }
`;

const Link = styled.a`
  color: var(--color-gray-600);
  text-decoration: none;

  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }
`;

const Version = styled.span`
  color: var(--color-gray-400);
`;

const Footer: React.FC<FooterProps> = ({
  companyName = "Almondo Inc.",
  showVersion = true,
  version = "1.0.0",
}) => {
  const year = new Date().getFullYear();

  return (
    <FooterContainer>
      <Copyright>
        &copy; {year} {companyName}
        {showVersion && <Version> v{version}</Version>}
      </Copyright>

      <Links>
        <Link href="#" onClick={(e) => e.preventDefault()}>
          利用規約
        </Link>
        <Link href="#" onClick={(e) => e.preventDefault()}>
          プライバシーポリシー
        </Link>
        <Link href="#" onClick={(e) => e.preventDefault()}>
          ヘルプ
        </Link>
      </Links>
    </FooterContainer>
  );
};

export default Footer;
