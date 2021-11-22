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
        this.languageList = ["English", "Português", "Deutsch"];
        this.generalUI = {"About":{"English":"About","Português":"Sobre","Deutsch":"Über"},
                            "Videogames":{"English":"Videogames","Português":"Videogames","Deutsch":"Videospiele"},
                            "Games":{"English":"Games","Português":"Jogos","Deutsch":"Spiele"},
                            "Stuff":{"English":"Stuff","Português":"Outros","Deutsch":"Misc"},
                            "Language":{"English":"Language","Português":"Idioma","Deutsch":"Sprache"},
                        };
        
        this.about = {"English":["Hey, I'm Dan Isamu, though I also go by the nick 'MisterProject' sometimes. I like making games; I'm not so good at playing them.",
                                "I'm currently a Computer Science student at UFSCAR Sorocaba, a federal university here in Brazil. Other than studying and developing games, I also dabble in writing stories and reviews sometimes (they're all bad).",
                                "Anyway, here's my contact information: "],
                    "Português":["Oi, meu nome é Danilo Isamu, mas também uso o nick MisterProject nas I N T E R W E B S para me comunicar. Eu gosto de criar jogos; não sou tão bom em jogá-los.",
                                "Atualmente estudo Ciência da Computação na UFSCAR Sorocaba. Além de estudar e desenvolver jogos, às vezes me arrisco a escrever reviews e histórias (todas são ruins).",
                                "Enfim, aqui estão minhas informações de contato: "],
                    "Deutsch":["Hi, ich heiße Dan Isamu, aber ich verwende manchmal auch den Spitzname MisterProject im Internet. Ich erstelle gerne Spiele; bin aber nicht so gut darin, sie zu spielen.",
                                "Aktuell studiere ich Informatik an UFSCAR Sorocaba, eine Universität hier im Brasilien. Außer zu studieren und Spiele zu entwickeln, schreibe ich ab und zu Reviews und Geschichten (sie sind alle schlecht).",
                                "Oh, und übrigens, hier sind meine Kontaktdaten: "]}
        
        this.projectList = Projects;

        this.languageClicked = this.languageClicked.bind(this);
        this.sandwichClicked = this.sandwichClicked.bind(this);
        this.mapProjects = this.mapProjects.bind(this);
        console.log("Heroku app");
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


        const videogameProjects = this.mapProjects(this.projectList.filter(element => {
            return !element.hasOwnProperty('type') || element["type"] === "Videogame";
        
        }));

        const gameProjects = this.mapProjects(this.projectList.filter(element => {
            return element.hasOwnProperty('type') && element["type"] === "Game";
        
        }));

        const stuffProjects = this.mapProjects(this.projectList.filter(element => {
            return element.hasOwnProperty('type') && element["type"] === "Stuff";
        
        }));

        const aboutMe = <About lang={this.state.language} texts={this.about}/>

        const curriculo = (this.state.language === "Português") ? <p><a href="/Data/Currículo - Jogos.pdf" download>Currículo</a></p> : "";

        return (<div>
            <div class="tinyWhitespace"/>
            <div class="tinyWhitespace"/>
            <div id="header">
                <h1><a href="#">Dan Isamu</a></h1>
                <h2><a href="#">misterprojectlc.github.io</a></h2>
                <div id="links">
                    <a href="#videogames">{this.generalUI["Videogames"][this.state.language]}</a>
                    <a href="#games">{this.generalUI["Games"][this.state.language]}</a>
                    <a href="#stuff">{this.generalUI["Stuff"][this.state.language]}</a>
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
                <h1 class="title" id="videogames">{this.generalUI["Videogames"][this.state.language]}</h1>
                {videogameProjects}

                <div class="tinyWhitespace"/>
                <h1 class="title" id="games">{this.generalUI["Games"][this.state.language]}</h1>
                {gameProjects}

                <div class="tinyWhitespace"/>
                <h1 class="title" id="stuff">{this.generalUI["Stuff"][this.state.language]}</h1>
                {stuffProjects}


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
                                <p><a href="https://gamejolt.com/@MisterProject" target="_blank">Gamejolt</a></p>
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