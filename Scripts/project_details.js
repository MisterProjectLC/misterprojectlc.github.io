class ProjectDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
        this.closing = false;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBackdropClick = this.handleBackdropClick.bind(this);

        this.close = this.close.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        this.previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden"; // stop the page from scrolling behind the window

        console.log(this.state.visible);
        this.setState({ visible: true });
        this.frame = requestAnimationFrame(() => {
            this.frame = requestAnimationFrame(() => this.setState({ visible: true }));
        });
        console.log(this.state.visible);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.body.style.overflow = this.previousOverflow;

        cancelAnimationFrame(this.frame);
        clearTimeout(this.timeout);
    }

    close() {
        if (this.closing) 
            return;
        this.closing = true;

        console.log("Close");
        this.setState({ visible: false });
        this.timeout = setTimeout(this.props.onClose, 250); // same duration as the CSS transition
    }

    handleKeyDown(e) {
        if (e.key === "Escape")
            this.close();
    }

    handleBackdropClick(e) {
        // only close when the dark area itself is clicked, not something inside the window
        if (e.target === e.currentTarget)
            this.close();
    }

    // string, or object keyed by language ({ en: "...", pt: "..." })
    localize(value) {
        if (!value) return null;
        if (typeof value === "string" || Array.isArray(value)) return value;
        return value[this.props.lang] || null;
    }

    render() {
        const { descriptions, video, tags, onClose } = this.props;

        const title = this.localize(this.props.name);
        const description = this.localize(descriptions);
        const work = this.localize(this.props.work);

        const links = [
            { href: this.props.link, category: this.props.category },
            { href: this.props.link2, category: this.props.category2 }
        ].filter(l => l.href);

        return (
            <div className={"details_backdrop" + (this.state.visible ? " visible" : "")} onClick={this.handleBackdropClick}>
                <section className="details" role="dialog" aria-modal="true" aria-label={title || "Project details"}>

                    <button type="button" className="details_close" onClick={this.close} aria-label="Close">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 4 L20 20 M20 4 L4 20"/>
                        </svg>
                    </button>

                    <div className="details_media">
                        <img src={this.getImage()} alt=""/>
                    </div>

                    <div className="details_info">
                        <div className="details_scroll">
                            {title && <h3 className="details_title">{title}</h3>}

                            {description && <p className="details_description">{description}</p>}

                            {work && work.length > 0 && <ul className="details_work">
                                <p className="details_description">{this.localize(
                                {"Português":"Contribuições", "English":"Contributions"})}</p>
                                {work.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>}

                            {tags && tags.length > 0 && <ul className="details_tags">
                                {tags.map((tag, i) => <li key={i}>{tag}</li>)}
                            </ul>}
                        </div>

                        {links.length > 0 && <div className="details_links">
                            {links.map((l, i) =>
                                <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">
                                    <img src={this.getIcon(l.category)} alt={l.category}/>
                                </a>
                            )}
                        </div>}
                    </div>
                </section>
            </div>
        );
    }

    // vertical image for this window; falls back to the card's background if none is given
    getImage() {
        return "Images/Background/Detail/" + this.props.name + ".png";
    }

    getIcon(name) {
        return "Images/Icon/" + name + ".png";
    }
}
