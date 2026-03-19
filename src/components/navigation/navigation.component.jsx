import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Navigation = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  const isHome = router.pathname === '/';

  return (
    <header>
      <div className="headerInner">
        <Link href="/">Mohammad Rezaei</Link>
        <div className="divider" />

        <button onClick={handleToggle} className="mobileMenu" type="button">
          {navbarOpen ? 'Close' : 'Menu'}
        </button>

        <nav className={`menuNav ${navbarOpen ? ' showMenu' : ''}`}>
          <div className="navInner">
            <Link href={isHome ? '#about' : '/#about'} onClick={closeMenu}>
              About
            </Link>
            <Link href="/works" onClick={closeMenu}>
              Works
            </Link>
            <Link href="/store" onClick={closeMenu}>
              Store
            </Link>
            <Link href={isHome ? '#contact' : '/#contact'} onClick={closeMenu}>
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
