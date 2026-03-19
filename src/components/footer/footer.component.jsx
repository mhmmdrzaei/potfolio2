const Footer = ({ emailAddress, contact = [] }) => {
  return (
    <footer id="contact">
      <nav>
        <h2>ways to contact</h2>
        {contact.map(({ id, _key, title, url }) => (
          <a href={url} rel="noreferrer" key={id || _key} target="_blank">
            {title}
          </a>
        ))}
      </nav>

      <div className="email">
        <div className="emailVisual">
          <img className="guySVG" src="/sources/guy.svg" alt="decorative figure" />
          <img className="footerArrow" src="/sources/footer.svg" alt="decorative line" />
        </div>

        <h4>I prefer email:</h4>
        <a href={`mailto:${emailAddress}`}>info(at)mohammadrezaei(dot)com</a>
      </div>

      <div className="siteCredits">
        <span>This website is designed & developed by myself. </span>
        <span className="copyright">
          © {new Date().getFullYear()} Mohammad Rezaei
        </span>
      </div>
    </footer>
  );
};

export default Footer;
