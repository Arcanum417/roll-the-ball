import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import './styles.css';
import './example-styles.css';
//import './styles-resizable.css';
const ReactGridLayout =  require('react-grid-layout');

var sizeW=4;
var sizeH=4;
const originalLayout = getFromLS('layout')
class NoCompactingLayout extends React.PureComponent {
/*
    resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 100);
        });
    }

    async componentDidMount() {
        var d = await this.resolveAfter2Seconds(10)
        this.pickGame(0);
    }
*/
    componentDidMount() {
        var xhttp = new XMLHttpRequest();
        var self = this
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                self.setState({ xmlDoc: this.responseXML })
            }
        };
        xhttp.open("GET", "rollTheBall.xml", true);
        xhttp.send();
        console.log(this.state.xmlDoc);
    }

    constructor(props) {
        super(props);

        var score = 9;

        this.state = {
            //layout: JSON.parse(JSON.stringify(originalLayout)),
            items: [],
            layout: [],
            score,
        };
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    onLayoutChange(layout) {
        console.log("onLayoutChange!", layout);
        //saveToLS('layout', layout);
        this.setState({layout});
        //this.props.onLayoutChange(layout);

    }

    checkWin(gameSelectionIndex)
    {
        var game = this.state.xmlDoc.getElementsByTagName('rolltheball')[0].getElementsByTagName('games')[0].getElementsByTagName('game')[gameSelectionIndex];
        var gameSolutions = game.getElementsByTagName('solution')
        for(var i = 0; i < gameSolutions.length; i++) {

            var gameSolutionSplitRows = gameSolutions[i].firstChild.nodeValue.split(';');
            var gameSolutionSplit = new Array(gameSolutionSplitRows.length);
            for (var j = 0; j < gameSolutionSplitRows.length; j++) {
                gameSolutionSplit[j] = gameSolutionSplitRows[j].split(',');
            }

            console.log(gameSolutionSplit);

            for (var k = 0; k < this.state.layout.length; k++) {
                for (var l = 0; l < this.state.items.length; l++) {
                    if (this.state.layout[k].i == this.state.items[l].i) {
                        this.state.layout[k]
                        this.state.items[l]

                        //if (gameSolutionSplit[this.state.layout[k].x][this.state.layout[k].y] == )
                    }
                }

            }
        }

    }

    generateDOM() {
        var items = this.state.items;

        var textArray = [
            'direct.png',
            'turn.png',
            'box.png'
        ];
        var randomNumber = Math.floor(Math.random()*textArray.length);

        function getOneDOM(item,index){
            var blocks = this.state.xmlDoc.getElementsByTagName('rolltheball')[0].getElementsByTagName('blocks')[0].getElementsByTagName('block');
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
        console.log(this.state.xmlDoc);
        this.state.xmlDoc.getElementsByTagName('block');
        var game = this.state.xmlDoc.getElementsByTagName('rolltheball')[0].getElementsByTagName('games')[0].getElementsByTagName('game')[gameSelectionIndex];
        var blocks = this.state.xmlDoc.getElementsByTagName('rolltheball')[0].getElementsByTagName('blocks')[0].getElementsByTagName('block');
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
        this.setState({
            items: []
        });

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
                    this.state.items.push(this.generateItem(j,i,counter.toString(),isStatic,gameTaskSplit[i][j].toString(),imgSource,rotation));
                }
                counter++;
            }
        }
        this.setState({
            layout: this.state.items
        });
    }

    generateItem(xI,yI,idI,staticI,typeI,imgSourceI,rotationI) {
        return {i: idI, x: xI, y: yI, w: 1, h: 1, static: staticI, type: typeI, imgSource: imgSourceI, rotation: rotationI};
    }

    render() {
        if(this.state.xmlDoc) {
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
                    <select id="gameNumber">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <button onClick={() => this.checkWin(document.getElementById("gameNumber").options[document.getElementById("gameNumber").selectedIndex].value)}>CheckWin</button>
                    <button onClick={() => this.pickGame(document.getElementById("gameNumber").options[document.getElementById("gameNumber").selectedIndex].value)}>LoadGame</button>
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
            ls = JSON.parse(global.localStorage.getItem('rgl-7')) || {};
        } catch(e) {/*Ignore*/}
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem('rgl-7', JSON.stringify({
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