import React from 'react';
import { Link } from 'react-router';
import { BsTwitterX } from "react-icons/bs";
import { FaWallet, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-gray-200 ">
      <div className="footer p-10 container mx-auto md:flex lg:flex justify-between  ">
        <aside>
          <FaWallet className="text-5xl text-primary" />
          <p className="text-2xl font-bold">FinEase</p>
          <p>Your Personal Finance Companion</p>
        </aside>
        <nav>
          <h6 className="footer-title">Contact</h6>
          <a className="link link-hover">Contact Us</a>
          <a className="link link-hover">mdnirob30@gmail.com</a>
          <a className="link link-hover">+1 (234) 567-890</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="/terms" className="link link-hover">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="link link-hover">
            Privacy Policy
          </Link>
          <Link to="/cookie" className="link link-hover">
            Cookie Policy
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Social Media</h6>
          <div className="grid grid-flow-col gap-4 text-2xl">
            <a
              href="https://www.facebook.com/share/166gwpyLVW/"
              target="_blank"
              rel="noreferrer"
              className="link link-hover"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="link link-hover"
            >
              <BsTwitterX />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="link link-hover"
            >
              <FaLinkedin />
            </a>
          </div>
        </nav>
      </div>
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            FinEase Ltd.
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;