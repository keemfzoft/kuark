export function Appbar() {
    return (
        <div layout="appbar" aesthetic="header">
            <div>
                <img source="/assets/images/logo-fit.png" aesthetic="icon" />
            </div>
            <div>
                <h1 aesthetic="app-brand">
                    <span>Keemf</span>
                    <span aesthetic="zoft">zoft</span>
                </h1>
                <h2 aesthetic="app-name">
                    <span aesthetic="highlight">Kuark</span>
                    <span>&nbsp;Visual Kit Demo</span>
                </h2>
            </div>
            <div aesthetic="app-widgets">
                <div curator="tray" glyph="profile"></div>
            </div>
        </div>
    );
}

export function Sidebar() {
    return (
        <div aesthetic="sidebar">
            <div curator="shelf"></div>
        </div>
    );
}

export function Workspace() {
    return (
        <div aesthetic="workspace">
            <div curator="desk"></div>
        </div>
    );
}

export function Footer() {
    return (
        <div aesthetic="footer">© 2025 Keemfzoft. All rights reserved.</div>
    );
}