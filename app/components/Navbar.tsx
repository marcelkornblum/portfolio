import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link href="/" className="navbar-link">
                    Home
                </Link>
                <Link href="/timeline" className="navbar-link">
                    Experience
                </Link>
                <Link href="/skills" className="navbar-link">
                    Skills
                </Link>
                <Link href="/awards" className="navbar-link">
                    Awards
                </Link>
                <Link href="/interests" className="navbar-link">
                    Interests
                </Link>
                <Link href="/contact" className="navbar-link">
                    Contact
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
