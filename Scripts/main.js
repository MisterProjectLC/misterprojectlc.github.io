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
        this.state = { lang: 0, language:"English", dropdownMenu: false };
        this.languageList = ["English", "Português"];
        this.generalUI = {"About":{"English":"About","Português":"Sobre"},
                            "Godot":{"English":"Godot","Português":"Godot"},
                            "Unity":{"English":"Unity","Português":"Unity"},
                            "Design":{"English":"Game Design","Português":"Game Design"},
                            "Language":{"English":"Language","Português":"Idioma"},
                        };
        
        this.about = {"English":["Hey, I'm Dan Isamu, though I also go by the nick 'MisterProject' sometimes. I'm a game developer based in Brazil, specialized in developing and designing gameplay and combat systems.",
                                "I currently work as Creative Director and Godot Developer at Lightmancer Studios.",
                                "Anyway, here's my contact information: "],
                    "Português":["Opa! Meu nome é Danilo Isamu, mas você também pode me conhecer como MisterProject. Sou um desenvolvedor de jogos daqui do Brasil, especializado em desenvolver e projetar sistemas de gameplay e combate.",
                                "Atualmente, trabalho como Diretor Criativo e Desenvolvedor Godot na Lightmancer Studios.",
                                "Enfim, aqui estão minhas informações de contato: "]}
        
        this.projectList = Projects;

        this.languageClicked = this.languageClicked.bind(this);
        this.sandwichClicked = this.sandwichClicked.bind(this);
        this.mapProjects = this.mapProjects.bind(this);
    }

    componentDidMount() {
        $('#language').on('click', this.languageClicked);
        $('#languageDropdown').on('click', this.languageClicked);
        $('#sandwich').on('click', this.sandwichClicked);

        $(window).resize(function() {
            let aspect_ratio = $(window).width()/$(window).height();
            if (aspect_ratio > 11/7) {
                $("#links a").css("opacity", "100%");
            } else {
                $("#links a").css("opacity", "0%");
            }
            $("#languageDropdown").css("opacity", "0%");
        });
    }

    languageClicked() {
        this.setState({lang: (this.state.lang + 1) % this.languageList.length});
        this.setState({language: this.languageList[this.state.lang]});
        return false;
    }

    sandwichClicked() {
        this.setState({dropdownMenu: !this.state.dropdownMenu});
        if (this.state.dropdownMenu) {
            $("#links a").css("opacity", "100%");
            $("#links a").css("pointer-events", "all");
            $("#links").css("pointer-events", "all");
            if ($("#language .header_button").css("opacity") == 0) {
                $("#links").css("height", "30vh");
                $("#languageDropdown").css("opacity", "100%");
            } else {
                $("#links").css("height", "25vh");
                $("#languageDropdown").css("opacity", "0%");
            }
        } else {
            $("#links").css("height", "0vh");
            $("#links a").css("opacity", "0%");
            $("#links").css("pointer-events", "none");
            $("#links a").css("pointer-events", "none");
        }

        return false;
    }


    mapProjects(filteredList) {
        return filteredList.map(element => {
            return (
                <Project lang={this.state.language}
                descriptions={element["descriptions"]} video={element["video"]}
                link={element["link"]} category={element["category"]}
                link2={element["link2"]} category2={element["category2"]} bg={element["name"]}/>
            );
        });
    }

    render() {
        const carouselFrames = this.projectList.filter(element => {
            return element.hasOwnProperty('carousel') && element["carousel"] === true;
        
        }).map((element, index) => {
            return (
                <Frame lang={this.state.language} name={element["name"]}
                descriptions={element["descriptions"]} position={index}/>
            );
        });

        const carouselIndicators = carouselFrames.map((element, index) => {
            return (
                <li data-target="#carouselExampleIndicators" data-slide-to={index}></li>
            );
        });


        const godotProjects = this.mapProjects(this.projectList.filter(element => {
            return !element.hasOwnProperty('type') || element["type"] === "Godot";
        
        }));

        const unityProjects = this.mapProjects(this.projectList.filter(element => {
            return element.hasOwnProperty('type') && element["type"] === "Unity";
        
        }));

        const designProjects = this.mapProjects(this.projectList.filter(element => {
            return element.hasOwnProperty('type') && element["type"] === "Game Design";
        
        }));

        const aboutMe = <About lang={this.state.language} texts={this.about}/>

        const curriculo = (this.state.language === "English") ? <p><a href="/Data/Resume - Dan Isamu.pdf" download>Resume</a></p> : 
            ((this.state.language === "Português") ? <p><a href="/Data/Currículo - Dan Isamu.pdf" download>Currículo</a></p> : "");

        return (<div>
            <div class="tinyWhitespace"/>
            <div class="tinyWhitespace"/>
            <div id="header">
                <h1><a href="#">Dan Isamu</a></h1>
                <h2><a href="#">misterprojectlc.github.io</a></h2>
                <div id="links">
                    <a href="#godot">{this.generalUI["Godot"][this.state.language]}</a>
                    <a href="#unity">{this.generalUI["Unity"][this.state.language]}</a>
                    <a href="#design">{this.generalUI["Design"][this.state.language]}</a>
                    <a href="#about">{this.generalUI["About"][this.state.language]}</a>
                    <a id="languageDropdown">{this.generalUI["Language"][this.state.language]}</a>
                </div>
                <a id="language"><img class="header_button" src="Images/language-512.png"/></a>
                <label for="checkbox">
                    <a id="sandwich"><img class="header_button" src="Images/Sandwich.png"/></a>
                </label>
            </div>

            <main>
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        {carouselIndicators}
                    </ol>
                    <div class="carousel-inner">
                        {carouselFrames}
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                    
                <div class="tinyWhitespace"/>
                <h1 class="title" id="godot">{this.generalUI["Godot"][this.state.language]}</h1>
                {godotProjects}

                <div class="tinyWhitespace"/>
                <h1 class="title" id="unity">{this.generalUI["Unity"][this.state.language]}</h1>
                {unityProjects}

                <div class="tinyWhitespace"/>
                <h1 class="title" id="design">{this.generalUI["Design"][this.state.language]}</h1>
                {designProjects}


                <div class="smallWhitespace"></div>
                <h1 class="title" id="about">{this.generalUI["About"][this.state.language]}</h1>
                <div class="about">
                    <div class="flex-container">
                        <div class="text-left">
                            {aboutMe}
                            <div class="link-container">
                                <p><a href="mailto: dan.inafuku@hotmail.com" target="_blank">Email</a></p>
                                {curriculo}
                                <p><a href="https://www.linkedin.com/in/danilo-isamu-inafuku-b947771aa/" target="_blank">LinkedIn</a></p>
                                <p><a href="https://www.youtube.com/channel/UCmW6TidbLs2qqpRgW7leT5Q" target="_blank">Youtube</a></p>
                                <p><a href="https://misterproject.itch.io/" target="_blank">itch.io</a></p>
                                <p><a href="https://github.com/MisterProjectLC" target="_blank">GitHub</a></p>
                            </div>
                        </div>
                        <div class="image">
                            <img src="Images/DINOFAURO.png"/>
                        </div>
                    </div>
                </div>

            </main>
    
        </div>)
    }
}

ReactDOM.render(<Main/>, document.getElementById('start'))