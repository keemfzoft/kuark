export function App() {
    return (
        <div layout="admin">
            <div curator="admin" glyph="appbar"></div>
            <div layout="workbench">
                <div curator="admin" glyph="sidebar"></div>
                <div curator="admin" glyph="workspace"></div>
            </div>
            <div curator="admin" glyph="footer"></div>
        </div>
    );
}