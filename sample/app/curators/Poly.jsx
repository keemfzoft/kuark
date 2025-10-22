export function Header() {
    return (
        <div layout="title">
            <img source="../assets/images/logo-fit.png" aesthetic="logo" />
            <h1 aesthetic="title">
                <span>Keemf</span>
                <span aesthetic="zoft">zoft</span>
            </h1>
            <h2 aesthetic="subtitle">
                <span aesthetic="highlight">Kuark</span>
                <span>&nbsp;Visual Kit Sample</span>
            </h2>
        </div>
    );
}

export function Tagline() {
    return (
        <div layout="tagline">
            <div>
                <span>Where&nbsp;</span><span aesthetic="keyword">Logic</span><span>&nbsp;and&nbsp;</span>
            </div>
            <div>
                <span aesthetic="keyword">Creativity</span><span>&nbsp;Merge in</span>
            </div>
            <div>
                <span>Lines of Code</span>
            </div>
        </div>
    );
}

export function Cover() {
    return (
        <div>
            <Header />
            <Tagline />
        </div>
    );
}