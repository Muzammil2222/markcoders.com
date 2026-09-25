import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import astronautSrc from '../assets/404/astronaut.svg'
import starsSrc from '../assets/404/overlay_stars.svg'
import './NotFound.css'

/**
 * Layout inspired by https://github.com/ZajithCorro/404-not-found-page
 * Restyled for MarkCoders (dark navy + #25A9E0).
 */
function NotFound() {
  return (
    <div className="not-found">
      <div
        className="not-found__stars"
        style={{ backgroundImage: `url(${starsSrc})` }}
        aria-hidden="true"
      />
      <Navbar />
      <main className="not-found__main">
        <div className="not-found__message">
          <strong className="not-found__code">404</strong>
          <p className="not-found__title">Looks like you are lost in space</p>
          <p className="not-found__text">
            The page you are looking for might be removed or is temporarily
            unavailable.
          </p>
          <Link to="/" className="not-found__btn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Go Back Home
          </Link>
        </div>

        <div className="not-found__astronaut" aria-hidden="true">
          <img src={astronautSrc} alt="" />
        </div>
      </main>
    </div>
  )
}

export default NotFound
