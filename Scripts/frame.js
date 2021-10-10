
class Frame extends React.Component {
    constructor(props) {
        super(props);
        this.ordinal = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh"]
    }
    
    render() {
        if (!this.props.descriptions[this.props.lang])
            return <div/>;
        return (
            <div class={"carousel-item" + ((this.props.position == 0) ? " active" : "")}>
                <img class="d-block w-100" src={this.getImage(this.props.name)} alt={this.ordinal[this.props.position] + " slide"}/>
                <div class="carousel-caption d-none d-md-block">
                    <h5 style={{"font-family": "Square"}}>{this.props.name}</h5>
                    <p>{this.props.descriptions[this.props.lang]}</p>
                </div>
            </div>
        );
    }

    getImage(name) {
        return "Images/Carousel/" + name + ".png";
    }
}
