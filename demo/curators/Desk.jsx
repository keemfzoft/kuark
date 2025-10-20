function Card(props) {
    return (
        <div aesthetic="card">
            <div aesthetic="label">
                <h3 aesthetic="name">{props.name}</h3>
                <small aesthetic="description">{props.description}</small>
            </div>
            <div aesthetic="value">{props.value}</div>
        </div>
    );
}

export function Desk() {
    const cards = [
        { name: "Products", description: "Total products count", value: "1000" },
        { name: "Categories", description: "Total categories count", value: "300" },
        { name: "Brands", description: "Total brands count", value: "200" },
    ];

    return (
        <div aesthetic="desk">
            <div layout="quarter" aesthetic="figures">
                {cards.map(props => <Card {...props} />)}
                <Card name="Topics" description="Total number of topics" value="150" />
            </div>
            <div curator="figur"></div>
        </div>
    );
}