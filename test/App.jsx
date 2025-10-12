export function App() {
    return (
        <div layout="admin">
            <div curator="header">Header</div>
            <Curator name="content" />
            <div curator="footer">Footer</div>
        </div>
    );
}

function Curator(props) {
    return (
        <div></div>
    );
}