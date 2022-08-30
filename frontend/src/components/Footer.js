export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer page__footer"> 
      <p className="footer__copyright">
        © {year} Mesto Russia
      </p>
    </footer> 
  );
}  