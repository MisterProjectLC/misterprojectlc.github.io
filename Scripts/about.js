
class About extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return this.props.texts[this.props.lang].map(element => {
            return <p>{element}</p>;
        })
    }
}
