import Nav from "./components/Nav";

const Layout =({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Nav />
            <main>{children}</main>
        </div>
    );
}

export default Layout;