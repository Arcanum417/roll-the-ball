import React from 'react';
import './styles.css';
import './example-styles.css';
const ReactGridLayout =  require('react-grid-layout');

var xmlDoc;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};
xhttp.open("GET", "rollTheBall.xml", true);
xhttp.send();

function myFunction(xml) {
    xmlDoc = xml.responseXML;
}

var sizeW=4;
var sizeH=4;

class NoCompactingLayout extends React.PureComponent {

    resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 100);
        });
    }

    async componentDidMount() {
        var d = await this.resolveAfter2Seconds(10);
        const layout = getFromLS("layout");
        this.loadGame();
        const history = this.state.history.slice(0, -1);
        if (layout) {
            this.setState({
                history: history
            });
        }
        if (layout && history.length == 0)
        {
            this.setState({
            score: this.state.score+1,
            history: [layout]
            });
        }
    }

    constructor(props) {
        super(props);

        var score = 0;

        this.state = {
            items: [],
            layout: [],
            history: [],
            lastGame: 0,
            games: 0,
            highScore: 99999,
            score
        };
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    onLayoutChange(layout) {
        this.setState({
            layout: layout,
            score: this.state.score+1,
            history: this.state.history.concat([layout])
        });
        var win = this.checkWin(this.state.lastGame);
        if (win)
        {
            alert("No ta ši zrobil totu hru čislo däväť, sry vlastne " + this.state.lastGame);
            this.pickGame(this.state.lastGame + 1)
        }

    }

    returnSteps(steps){
        if (steps < this.state.history.length) {
            var history = this.state.history.concat();
            var score = JSON.parse(JSON.stringify(this.state.score)) - steps - 1;
            this.setState({
                layout: history[history.length - 1 - steps],
                score: score,
                history: this.state.history.slice(0,-steps-1)
            });
        }
    }

    checkWin(gameSelectionIndex) {
        var game = xmlDoc.getElementsByTagName('rolltheball')[0].getElementsByTagName('games')[0].getElementsByTagName('game')[gameSelectionIndex];
        var gameSolutions = game.getElementsByTagName('solution')
        var badSolutions = 0;
        loopAllSolutions:
            for (var i = 0; i < gameSolutions.length; i++) {

                var gameSolutionSplitRows = gameSolutions[i].firstChild.nodeValue.split(';');
                var gameSolutionSplit = new Array(gameSolutionSplitRows.length);
                for (var j = 0; j < gameSolutionSplitRows.length; j++) {
                    gameSolutionSplit[j] = gameSolutionSplitRows[j].split(',');
                }

                var layout = this.state.layout.concat();
                var items = this.state.items.concat();
                loopOneSolution:
                for (var k = 0; k < gameSolutionSplit.length; k++){ //k je y
                    for (var l = 0; l < gameSolutionSplit[k].length; l++) { //l je x
                        var badSolutionItems = 0;
                        loopOneSolutionItem:
                        for (var m = 0; m < layout.length; m++) {
                            for (var n = 0; n < items.length; n++) {
                                if (layout[m].i == items[n].i) {
                                    if ((gameSolutionSplit[k][l] == "N") || (k == layout[m].y && l == layout[m].x && gameSolutionSplit[k][l] == items[n].type)){
                                        break loopOneSolutionItem;
                                    }
                                    else {
                                        badSolutionItems++;
                                    }
                                }
                            }
                        }
                        if (badSolutionItems == items.length) {
                            badSolutions++;
                            break loopOneSolution;
                        }

                    }
                }

            }
        if (gameSolutions.length == badSolutions)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }
    saveGame(){
        localStorage.clear();
        saveToLS("layout",this.state.layout);
        saveToLS("history",this.state.history);
        saveToLS("lastGame",this.state.lastGame);
        saveToLS("highScore",this.state.highScore);
        saveToLS("score",this.state.score);

    }

    loadGame(){
        const layout = getFromLS("layout");
        const history = getFromLS("history");
        const lastGame = getFromLS("lastGame");
        const highScore = getFromLS("highScore");
        const score = getFromLS("score");

        if(layout) {
            this.setState({
                highScore: JSON.parse(JSON.stringify(highScore)),
                score: JSON.parse(JSON.stringify(score)-JSON.parse(JSON.stringify(history)).length+1)
            });
            this.pickGame(JSON.parse(JSON.stringify(lastGame)));
            this.setState({
                layout: JSON.parse(JSON.stringify(layout)),
                history: JSON.parse(JSON.stringify(history)),
                lastGame: JSON.parse(JSON.stringify(lastGame)),
                highScore: JSON.parse(JSON.stringify(highScore)),
                score: JSON.parse(JSON.stringify(score))-1
            });
        }
        else
        {
            if (highScore)
            {
                this.setState({
                    highScore: JSON.parse(JSON.stringify(highScore)),

                });
            }
            if (score)
            {
                this.setState({
                    score: JSON.parse(JSON.stringify(score)),

                });
            }
            if (lastGame)
            {
                this.setState({
                    lastGame: JSON.parse(JSON.stringify(lastGame)),

                });
                this.pickGame(lastGame);
            }
            else
            {
                this.pickGame(0);
            }
        }

    }
    generateDOM() {
        var items = this.state.items.slice();

        var textArray = [
            'direct.png',
            'turn.png',
            'box.png'
        ];
        var randomNumber = Math.floor(Math.random()*textArray.length);

        function getOneDOM(item,index){
            var blocks = xmlDoc.getElementsByTagName('rolltheball')[0].getElementsByTagName('blocks')[0].getElementsByTagName('block');
            return(this.generateDOMItem(item.i,item.imgSource,item.rotation))
        }
        return(items.map(getOneDOM,this));

    }

    generateDOMItem(keyp,imageSource,rotate){
        return (
            <div key={keyp}><img src={"img/" + imageSource } className={"rotate" + rotate + " gridItemImg"} /></div>
    )
    }

    pickGame(gameSelectionIndex){
        var games = xmlDoc.getElementsByTagName('rolltheball')[0].getElementsByTagName('games')[0].getElementsByTagName('game');
        if (gameSelectionIndex >= games.length)
        {
            alert("ŠI PAN, ŠI TO ZROBIL, zo skore: " + this.state.score);
            if (this.state.score < this.state.highScore)
            {
                this.setState({
                    highScore: JSON.parse(JSON.stringify(this.state.score)),
                });
            }
            this.pickGame(0);
            this.setState({score: 0});
            localStorage.clear();
            saveToLS("highScore",this.state.highScore);
            return 0;
        }
        var game = xmlDoc.getElementsByTagName('rolltheball')[0].getElementsByTagName('games')[0].getElementsByTagName('game')[gameSelectionIndex];
        var blocks = xmlDoc.getElementsByTagName('rolltheball')[0].getElementsByTagName('blocks')[0].getElementsByTagName('block');
        sizeH = parseInt(game.getElementsByTagName('size')[0].getElementsByTagName('horizontal')[0].firstChild.nodeValue);
        sizeW = parseInt(game.getElementsByTagName('size')[0].getElementsByTagName('vertical')[0].firstChild.nodeValue);
        var gameTask = game.getElementsByTagName('task')[0].firstChild.nodeValue;
        var gameTaskSplitRows = gameTask.split(';');
        var gameTaskSplit = new Array(gameTaskSplitRows.length);
        for (var i = 0; i < gameTaskSplitRows.length; i++) {
            gameTaskSplit[i] = gameTaskSplitRows[i].split(',');
        }

        this.setState({
            width: sizeW*100
        });
        var items = [];
        var counter = 0;
        for (var i = 0;i <gameTaskSplit.length;i++)
        {
            for (var j = 0;j <gameTaskSplit[i].length;j++)
            {


                var imgSource;
                var rotation;
                for (var k = 0; k < blocks.length;k++)
                {
                    if (gameTaskSplit[i][j].toString() == blocks[k].getElementsByTagName('name')[0].firstChild.nodeValue)
                    {
                        imgSource = blocks[k].getElementsByTagName('img')[0].firstChild.nodeValue;
                        rotation = blocks[k].getElementsByTagName('rotation')[0].firstChild.nodeValue;
                        break;
                    }
                }
                if(gameTaskSplit[i][j] != "E")
                {
                    var isStatic = false;
                    if (gameTaskSplit[i][j].charAt(0) == "S" || gameTaskSplit[i][j].charAt(0) == "F")
                        isStatic = true;
                    items.push(this.generateItem(j,i,counter.toString(),isStatic,gameTaskSplit[i][j].toString(),imgSource,rotation));
                }
                counter++;
            }
        }
        this.setState({
            items: items,
            layout: items,
            score: this.state.score-1,
            lastGame: gameSelectionIndex,
            games: games.length,
            history: []
        });
        localStorage.clear();
        saveToLS("highScore",this.state.highScore);
        saveToLS("lastGame",this.state.lastGame);
        saveToLS("score",this.state.score);

    }

    generateItem(xI,yI,idI,staticI,typeI,imgSourceI,rotationI) {
        return {i: idI, x: xI, y: yI, w: 1, h: 1, static: staticI, type: typeI, imgSource: imgSourceI, rotation: rotationI};
    }

    render() {
        if(xmlDoc) {
            return (
                <div>
                    <ReactGridLayout layout={this.state.layout}
                                     onLayoutChange={this.onLayoutChange}
                                     cols={sizeW}
                                     rowHeight={100}
                                     maxRows={sizeH}
                                     isResizable={false}
                                     autoSize={true}
                                     compactType={null}
                                     preventCollision={true}
                                     width={sizeW*100}
                                     margin={[0,0]}
                                     style={{width : sizeW*100}}
                                     {...this.props}
                    >
                        {this.generateDOM()}



                    </ReactGridLayout>
                    <button onClick={() => this.returnSteps(this.state.history.length - 1 > 0 ? this.state.history.length - 1:1)}>Reset level</button>
                    <button onClick={() => {localStorage.clear();saveToLS("highScore",this.state.highScore);window.location.reload(true);}} >Reset Game</button>
                    <select id="steps">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <button onClick={() => this.returnSteps(document.getElementById("steps").options[document.getElementById("steps").selectedIndex].value)}>Go x turns back</button>
                    <button onClick={() => this.saveGame()}>SaveGame</button>
                    <div>HighScore: {this.state.highScore}</div>
                    <div>Score: {this.state.score}</div>
                    <div>Hra cislo: {this.state.lastGame+1} / {this.state.games}</div>
                </div>
            )
        }
        return (
            "Loading..."
        );
    }
}

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem('rollTheBall_'+ key)) || {};
        } catch(e) {/*Ignore*/}
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem('rollTheBall_' + key, JSON.stringify({
            [key]: value
        }));
    }
}

class App extends React.Component {
    render () {
        return  (
            <div>
                <NoCompactingLayout />
                    <div>
                        {}
                    </div>
            </div>
        );
    }
}
export default App;