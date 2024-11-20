/* eslint-disable no-unused-vars */
import React from 'react';
import { footerLinks } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-green-900 py-10 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row flex-wrap gap-8 w-full justify-between">
        {footerLinks.map((section) => (
          <div key={section.title} className="w-full sm:w-1/2 md:w-1/4 flex flex-col">
            <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
            <ul className="list-none space-y-2">
              {section.links.map((item, index) => (
                <li key={index}>
                  {item.link ? (
                    <a href={item.link} className="hover:underline">
                      {item.name}
                    </a>
                  ) : (
                    <p>{item.name}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-green-800 text-center text-white py-4 mt-6">
        <p>&copy; 2024 AgroConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
