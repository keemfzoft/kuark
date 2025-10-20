function Card(props) {
    return (
        <div aesthetic="card" skin={props.skin}>
            <div aesthetic="value">{props.value}</div>
            <div aesthetic="label">
                <div aesthetic="name">{props.name}</div>
                <small aesthetic="description">{props.description}</small>
            </div>
        </div>
    );
}

function Panel() {
    const cards = [
        { name: "Total Sales", description: "+0.00% from yesterday", value: "$1,200.00", skin: "green" },
        { name: "Total Transactions", description: "+0.00% from yesterday", value: "25", skin: "orange" },
        { name: "Products Sold", description: "+0.00% from yesterday", value: "175", skin: "blue" },
    ];

    return (
        <div aesthetic="panel">
            <div aesthetic="label">
                <h4 aesthetic="name">Today's Sales</h4>
                <small aesthetic="description">Sales Summary</small>
            </div>
            <div layout="even" aesthetic="cards">
                {cards.map(props => <Card {...props} />)}
            </div>
        </div>
    );
}

export function Figur() {
    return (
        <div layout="half-screen">
            <Panel />
        </div>
    );
}