const Footer = () => {
  return (
    <footer className="py-6 mt-12 border-t border-border/50">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Tabelog Clone. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
