// Footer.js
import React from 'react';

const Footer = ({ content }) => {
    return (
        <footer className="bg-gray-800 text-white p-4 text-center">
            <p>{content}</p>
        </footer>
    );
};

export default Footer;
