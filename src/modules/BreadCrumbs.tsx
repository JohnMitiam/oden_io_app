import { HomeIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadCrumbLink {
  link: string;
  to: string;
}

interface Props {
  links: BreadCrumbLink[];
}

export const BreadCrumbs: React.FC<Props> = ({ links }) => {
  const location = useLocation();
  return (
    <nav
      className="flex justify-end pt-[8px] lg:pb-0 md:pb-0 pb-1"
      aria-label="Breadcrumb"
    >
      <ol role="list" className="px-4 flex space-x-2">
        <li key={`homelink`} className="flex">
          <div className="flex items-center">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon height="16" width="16" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>

        {links.map((link, index) => (
          <React.Fragment key={index}>
            {location.pathname !== "/" && (
              <li key={`arrow-${index}`} className="flex">
                <div className="flex items-center text-gray-400">{">"}</div>
              </li>
            )}

            <li key={`link-${index}`} className="flex">
              <div className="flex items-center">
                <Link
                  className="w-full text-[#000000] block transition hover:text-primary-600 text-xs"
                  to={link.to}
                >
                  {link.link}
                </Link>
              </div>
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
