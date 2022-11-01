import Header from "./header";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="page">
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
