import { Link } from '@tanstack/react-router';
import { portfolio } from '~/portfolio.config';

export function Footer() {
  return (
    <footer className='footer'>
      <p className='footer-imprint'>
        Written, designed, and set by {portfolio.name} in {portfolio.location}.
        Printed on whatever you are holding.
      </p>
      <ul className='footer-links'>
        <li>
          <Link to='/work'>Contents</Link>
        </li>
        <li>
          <Link to='/about'>Colophon</Link>
        </li>
        <li>
          <Link to='/contact'>Letters</Link>
        </li>
        {portfolio.socials.map((social) => (
          <li key={social.href}>
            <a href={social.href} rel='me noopener'>
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
