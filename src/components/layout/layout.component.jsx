import Footer from '../footer/footer.component.jsx';

const Layout = ({ children, emailAddress, contact }) => {
  return (
    <>
      <main>{children}</main>
      <Footer emailAddress={emailAddress} contact={contact} />
    </>
  );
};

export default Layout;
