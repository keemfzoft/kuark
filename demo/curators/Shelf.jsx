function Card(props) {
    return (
        <div aesthetic="card">
            <h3 aesthetic="title">{props.title}</h3>
            <p>{props.description}</p>
        </div>
    );
}

export function Shelf() {
    const cardsx = [
        { title: "Introduction", description: "A brief overview of the system's purpose, philosophy, and core capabilities. This section sets the tone and invites users into the experience." },
        { title: "Basic Usage", description: "Step-by-step instructions for getting started with the toolkit. Covers essential setup, common patterns, and minimal configuration." },
        { title: "Glyphs", description: "A visual reference for available icons, symbols, or UI primitives. Includes naming conventions, usage guidelines, and accessibility notes." },
        { title: "Deep Dive", description: "An in-depth exploration of advanced features, architectural decisions, and edge-case handling. Ideal for power users and contributors." },
        { title: "API", description: "A structured reference for all exposed methods, hooks, and configuration options. Includes parameters, return types, and usage examples." },
    ];

    const cards = [
        { title: "Introduction", description: "A brief overview of the system's purpose, philosophy, and core capabilities." },
        { title: "Basic Usage", description: "Step-by-step instructions for getting started with the toolkit." },
        { title: "Glyphs", description: "A visual reference for available icons, symbols, or UI primitives." },
        { title: "Deep Dive", description: "An in-depth exploration of advanced features, architectural decisions, and edge-case handling." },
        { title: "API", description: "A structured reference for all exposed methods, hooks, and configuration options." },
    ];

    return (
        <div layout="shelf">
            {cards.map(props => <Card {...props} />)}
        </div>
    );
}