
class Project extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if (!this.props.descriptions[this.props.lang])
            return <div/>;
        return (
            <div className="project">
            <div className="project_overlay">
                {this.props.video && <iframe src={this.props.video} 
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}

                <p>{this.props.descriptions[this.props.lang]}</p>

                {!this.props.link2 && <a href={this.props.link} target="_blank">
                    <img src={this.getIcon(this.props.category)}/>
                </a>}

                {this.props.link2 && <div className="project_overlay_2">
                    <a href={this.props.link} target="_blank">
                        <img src={this.getIcon(this.props.category)}/>
                    </a>

                    <a href={this.props.link2} target="_blank">
                        <img src={this.getIcon(this.props.category2)}/>
                    </a>
                </div>}
            </div>
            <img src={this.getBackground(this.props.bg)}/>
        </div>
        );
    }

    getBackground(name) {
        return "Images/Background/" + name + ".png";
    }

    getIcon(name) {
        return "Images/Icon/" + name + ".png";
    }
}
