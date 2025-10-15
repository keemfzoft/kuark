export function App() {
    return (
        <div layout="admin">
            <div curator="header">Header</div>
            <Curator name="content" />
            <div>
                <div curator="poly" glyph="glyph1"></div>
                <div curator="poly" glyph="glyph2"></div>
                <div curator="poly" glyph="glyph3"></div>
            </div>
            <Nested />
            <Container>
                <h2>Container</h2>
                <p>This is a container</p>
            </Container>
            <div curator="footer">Footer</div>
        </div>
    );
}

function Curator(props) {
    console.log(props);

    return (
        <div curator={props.name}></div>
    );
}

function Container(props) {
    return (
        <div>
            {props.children}
        </div>
    );
}

function Nested() {
    return (
        <div>
            <div>
                <h3>Subsection 1</h3>
                <div>
                    <h3>Subsection 2</h3>
                    <div>
                        <h3>Subsection 3</h3>
                        <div>
                            <h3>Subsection 4</h3>
                            <div>
                                <h3>Subsection 5</h3>
                                <div>Nested test</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}