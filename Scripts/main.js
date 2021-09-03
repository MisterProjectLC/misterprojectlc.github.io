$(document).ready(function(){
    //ReactDOM.render(<Main/>, document.getElementById('start'))
    /*$("#langbutton").click(function() {
        //this == the link that was clicked
        var href = $(this).attr("href");
    })*/
})

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lang: 0, projectsSetup: false };
        this.list = ["English", "Português", "Deutsch"];
        this.generalUI = [["Projects", "Still in construction!"], ["Projetos", "Ainda em construção!"], ["Projekte", "Noch im Bau!"]];
        this.failedGet = false;
        this.jsons = 0;
        this.projectList = [];
        this.descriptionList = [];

        this.setLang = this.setLang.bind(this);
        this.receiveProjectList = this.receiveProjectList.bind(this);
        this.receiveDescList = this.receiveDescList.bind(this);
        this.defaultToJson = this.defaultToJson.bind(this);
        this.matchProjectAndDesc = this.matchProjectAndDesc.bind(this);

        console.log("Heroku app");
        $.ajax("https://misterproject-github.herokuapp.com/", {"success":this.receiveProjectList, "error": this.defaultToJson, "timeout":10000});
        $.ajax("https://misterproject-github.herokuapp.com/descriptions", {"success":this.receiveDescList, "error": this.defaultToJson, "timeout":10000});
    }

    receiveProjectList(data, status) {
        if (status != 'success')
            return;

        console.log("Project list");
        this.projectList = data;
        if (this.descriptionList.length > 0)
            this.matchProjectAndDesc();
    };


    receiveDescList(data, status) {
        if (status != 'success')
            return;
        
        console.log("Descriptions list");
        this.descriptionList = data;
        console.log(this.descriptionList);
        if (this.projectList.length > 0)
            this.matchProjectAndDesc();
    }


    defaultToJson(data, status) {
        console.log("Timeout, defaulting to json...");

        if (this.failedGet == true) {
            return;
        }
        this.failedGet = true;

        this.projectList = Projects;
        this.descriptionList = Descriptions;
        this.matchProjectAndDesc();
    }


    matchProjectAndDesc() {
        for (let i = 0; i < this.projectList.length; i++) {
            this.projectList[i].list = {};
            console.log(this.projectList);

            for (let j = 0; j < this.descriptionList.length; j++) {
                if (this.descriptionList[j].list_id == this.projectList[i].id)
                    this.projectList[i].list[this.descriptionList[j].language] = this.descriptionList[j].text;
            }
        }

        console.log("Match");
        console.log(this.projectList);
        this.setState({projectsSetup: true});
        this.descriptionList = [];
    }

    componentDidMount() {
        document.getElementById('langbutton').addEventListener('click', this.setLang);
    }
    componentWillUnmount() {
        document.getElementById('langbutton').removeEventListener('click', this.setLang);
    }

    setLang() {
        this.setState({lang: (this.state.lang + 1) % this.list.length});
    }

    render() {
        const projectElements = this.projectList.map(element => {
            return (
                <Project lang={this.list[this.state.lang]}
                list={element["list"]} video={element["video"]}
                link={element["link"]} category={element["category"]}
                link2={element["link2"]} category2={element["category2"]} bg={element["name"]}/>
            );
        });

        return (<div>
            <div id="header">
            <h1>Dan Isamu - {this.generalUI[this.state.lang][0]}</h1>
            <h2>misterprojectlc.github.io</h2>
            <a id="langbutton" href="#"><p>{this.list[this.state.lang]}</p><img src="Images/language-512.png"/></a>
            </div>
            <main>
                <p>{this.generalUI[this.state.lang][1]}</p>

                {projectElements}
            </main>
    
        </div>)
    }
}

ReactDOM.render(<Main/>, document.getElementById('start'))