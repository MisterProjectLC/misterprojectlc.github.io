class Project extends React.Component {
    constructor(props) {
        super(props);
    }

    // Accepts either a plain string or an object keyed by language ({ en: "...", pt: "..." }),
    // so title/roles can be translated the same way descriptions are.
    localize(value) {
        if (!value) return null;
        if (typeof value === "string") return value;
        return value[this.props.lang] || null;
    }

    render() {
        const { lang, descriptions, bg, onOpen } = this.props;

        if (!descriptions[lang])
            return <div/>;

        const title = this.localize(this.props.title);
        const roles = this.localize(this.props.roles);
        const description = this.localize(this.props.descriptions);
        const roleLabel = this.localize(this.props.roleLabel) || "Role:";

        const links = [
            { href: this.props.link, category: this.props.category },
            { href: this.props.link2, category: this.props.category2 }
        ].filter(l => l.href);

        return (
            <article className="project">
                <button
                    type="button"
                    className="project_thumbnail"
                    onClick={onOpen}
                    aria-label={title ? "Open " + title : "Open project"}>
                    <img src={this.getBackground(bg)} alt=""/>
                </button>

                <div className="project_body">
                    {title && <h3 className="project_title">{title}</h3>}

                    <p className="project_description">{description}</p>

                    {roles && <p className="project_roles">
                        <span className="project_roles_label">{roleLabel}</span> {roles}
                    </p>}
                </div>

                {links.length > 0 && <div className="project_links">
                    {links.map((l, i) =>
                        <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">
                            <img src={this.getIcon(l.category)} alt={l.category}/>
                        </a>
                    )}
                </div>}
            </article>
        );
    }

    getBackground(name) {
        return "Images/Background/Square/" + name + ".png";
    }

    getIcon(name) {
        return "Images/Icon/" + name + ".png";
    }
}
