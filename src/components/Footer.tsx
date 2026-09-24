export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <p>Copyright Pixell River Financial {currentYear}.</p>
        </footer>
    );
}