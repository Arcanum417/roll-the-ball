import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import './styles.css';
import './example-styles.css';
//import './styles-resizable.css';
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
    console.log(xmlDoc);
    console.log(xmlDoc.getElementsByTagName("name")[0]);
}

const layoutStatic =
    [
        {i: '0', x: 0, y: 0, w: 1, h: 1},
        {i: '1', x: 1, y: 0, w: 1, h: 1,static: true},
        {i: '2', x: 2, y: 0, w: 1, h: 1},
        {i: '3', x: 3, y: 0, w: 1, h: 1,},
        {i: '4', x: 0, y: 1, w: 1, h: 1},
        {i: 'f', x: 1, y: 1, w: 1, h: 1},
        {i: 'g', x: 2, y: 1, w: 1, h: 1,},
        {i: 'h', x: 3, y: 1, w: 1, h: 1},
        {i: 'j', x: 1, y: 2, w: 1, h: 1},
        {i: 'k', x: 2, y: 2, w: 1, h: 1},
        {i: 'l', x: 3, y: 2, w: 1, h: 1},
        {i: 'm', x: 0, y: 3, w: 1, h: 1},
        {i: 'n', x: 1, y: 3, w: 1, h: 1},
        {i: 'p', x: 3, y: 3, w: 1, h: 1, static: true, type: "D180"}
    ];

const layoutStatic2 =
    [
        {i: '0', x: 0, y: 3, w: 1, h: 1},
        {i: '1', x: 1, y: 0, w: 1, h: 1,static: true},
        {i: '2', x: 2, y: 0, w: 1, h: 1},
        {i: '3', x: 3, y: 0, w: 1, h: 1,},
        {i: '4', x: 0, y: 1, w: 1, h: 1},
        {i: 'f', x: 1, y: 1, w: 1, h: 1},
        {i: 'g', x: 2, y: 1, w: 1, h: 1,},
        {i: 'h', x: 3, y: 1, w: 1, h: 1},
        {i: 'j', x: 1, y: 2, w: 1, h: 1},
        {i: 'k', x: 2, y: 2, w: 1, h: 1},
        {i: 'l', x: 3, y: 2, w: 1, h: 1},
        {i: 'm', x: 0, y: 3, w: 1, h: 1},
        {i: 'n', x: 1, y: 3, w: 1, h: 1},
        {i: 'p', x: 3, y: 3, w: 1, h: 1, static: true, type: "D180"}
    ];

var sizeW=4;
var sizeH=4;
const originalLayout = getFromLS('layout') || layoutStatic;
class NoCompactingLayout extends React.PureComponent {

    resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 100);
        });
    }

    async componentDidMount() {
        var d = await this.resolveAfter2Seconds(10)
        console.log(xmlDoc);
        this.pickGame(0);
    }
/*
    componentDidMount(){
        console.log(this.state.xmlDoc);
        //this.pickGame(0);

    }
*/
    constructor(props) {
        super(props);


        const layoutStatic3 =
            [
                {i: '0', x: 0, y: 0, w: 1, h: 1},
            ];
        var score = 9;

        this.state = {
            //layout: JSON.parse(JSON.stringify(originalLayout)),
            items: layoutStatic3,
            layout: [],
            score,
            layoutStatic3
        };
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.resetLayout = this.resetLayout.bind(this);
    }

    resetLayout() {
        this.setState({
            layout: this.state.items
        });
        console.log("nope");
    }

    onLayoutChange(layout) {
        console.log("onLayoutChange!", layout);
        //saveToLS('layout', layout);
        //this.setState({layout});
        //this.props.onLayoutChange(layout);

    }

   onDragStart(thing, thing2, thing3, thing4, thing5, thing6)   {
        console.log(thing, thing2, thing3, thing4, thing5, thing6);
    }
/*
    generateDOM() {
        return _.map(_.range(this.props.items), function(i) {
            return (<div key={i}><span className="text">{i}</span></div>);
        });
    }
*/
    /*
            generateDOM() {
                console.log("generateDOM");
                var textArray = [
                    'direct.png',
                    'turn.png',
                    'box.png'
                ];
                var randomNumber = Math.floor(Math.random()*textArray.length);

                return ([this.generateDOMItem(0, textArray[Math.floor(Math.random()*textArray.length)], 180),this.generateDOMItem(1, textArray[Math.floor(Math.random()*textArray.length)], 180),this.generateDOMItem(2, textArray[Math.floor(Math.random()*textArray.length)], 180),this.generateDOMItem(3, textArray[Math.floor(Math.random()*textArray.length)], 180)]
                );
            }
            */

    generateDOM() {
        var items = this.state.items;

        var textArray = [
            'direct.png',
            'turn.png',
            'box.png'
        ];
        var randomNumber = Math.floor(Math.random()*textArray.length);

        function getOneDOM(item,index){
            var blocks = xmlDoc.getElementsByTagName('rolltheball')[0].getElementsByTagName('blocks')[0].getElementsByTagName('block');
            console.log(item.type);
            return(this.generateDOMItem(item.i,textArray[Math.floor(Math.random()*textArray.length)],90))
        }
        //console.log("generateDOMReturnValue");
        //console.log(this.generateDOMItem(items[0].i,textArray[Math.floor(Math.random()*textArray.length)],90));
        //console.log(getOneDOM(items[0],0,this));
        return(items.map(getOneDOM,this));

    }

    generateDOMItem(keyp,imageSource,rotate){
        return (
            <div key={keyp}><img src={"img/" + imageSource } className={"rotate" + rotate + " gridItemImg"} /></div>
    )
    }
    pickGame(gameSelectionIndex){
        xmlDoc.getElementsByTagName('block');
        var game = xmlDoc.getElementsByTagName('rolltheball')[0].getElementsByTagName('games')[0].getElementsByTagName('game')[gameSelectionIndex];

        sizeH = parseInt(game.getElementsByTagName('size')[0].getElementsByTagName('horizontal')[0].firstChild.nodeValue);
        sizeW = parseInt(game.getElementsByTagName('size')[0].getElementsByTagName('vertical')[0].firstChild.nodeValue);
        var gameTask = game.getElementsByTagName('task')[0].firstChild.nodeValue;
        var gameTaskSplitRows = gameTask.split(';');
        var gameTaskSplit = new Array(gameTaskSplitRows.length);
        for (var i = 0; i < gameTaskSplitRows.length; i++) {
            gameTaskSplit[i] = gameTaskSplitRows[i].split(',');
        }

        console.log(sizeW);
        console.log(sizeH);
        console.log(gameTaskSplit);

        this.setState({
            width: sizeW*100
        });
        this.state.items = [];
        var counter = 0;
        for (var i = 0;i <gameTaskSplit.length;i++)
        {
            for (var j = 0;j <gameTaskSplit[i].length;j++)
            {
                this.state.items.push(this.generateItem(j,i,counter.toString(),false,gameTaskSplit[i][j].toString()));//
                counter++;
            }
        }
        //remove type empty, we dont need them
        for(var i = this.state.items.length - 1; i >= 0; i--) {
            if(this.state.items[i].type === "E") {
                this.state.items.splice(i, 1);
            }
        }
        this.setState({
            layout: this.state.items
        });
/*
        var layoutNew = this.state.layout;
        this.state.items.push(this.generateItem(4,4,"x",false,"T120"))
        this.setState({
            layout: layoutNew
        });
        console.log(layoutNew);
        this.forceUpdate();
*/
    }

    generateItem(xI,yI,idI,staticI,typeI) {
        return {i: idI, x: xI, y: yI, w: 1, h: 1, static: staticI, type: typeI};
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
                    <button onClick={this.resetLayout}>Reset Layout</button>
                    <select id="gameNumber">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <button onClick={() => this.pickGame(document.getElementById("gameNumber").options[document.getElementById("gameNumber").selectedIndex].value)}>LoadGame</button>
                    <button onClick={() =>
                        this.setState({
                            layout: layoutStatic2
                        })
                    }>Static2</button>
                </div>
            )
        }
        return (
            "Loading..."
        );
    }
}

/*
{this.generateDOMItem("0","box.png",0)}
                {this.generateDOMItem("1","start.png",180)}
                {this.generateDOMItem("2","box.png",0)}
                {this.generateDOMItem("3","box.png",0)}
                {this.generateDOMItem("4","box.png",0)}
                {this.generateDOMItem("5","direct.png",0)}
                {this.generateDOMItem("6","box.png",0)}
                {this.generateDOMItem("7","box.png",0)}
                {this.generateDOMItem("8","box.png",0)}
                {this.generateDOMItem("9","turn.png",0)}
                {this.generateDOMItem("10","turn.png",180)}
                {this.generateDOMItem("11","box.png",0)}
                {this.generateDOMItem("12","turn.png",0)}
                {this.generateDOMItem("13","finish.png",270)}
                {this.generateDOMItem("14","turn.png",270)}
                {this.generateDOMItem("15","turn.png",270)}

<button onClick={this.pickGame(document.getElementById("gameNumber").options[document.getElementById("gameNumber").selectedIndex].value)}>LoadGame</button>
<button onClick={this.resetLayout}>Reset Layout</button>
<div key="a"><span className="text">a</span></div>
                <div key="b"><span className="text">b</span></div>
                <div key="c"><span className="text">c</span></div>
                <div key="d"><span className="text">d</span></div>
                <div key="e"><span className="text">e</span></div>
                <div key="f"><span className="text">f</span></div>
                <div key="g"><span className="text">g</span></div>
                <div key="h"><span className="text">h</span></div>
                <div key="j"><span className="text">j</span></div>
                <div key="k"><span className="text">k</span></div>
                <div key="l"><span className="text">l</span></div>
                <div key="m"><span className="text">m</span></div>
                <div key="n"><span className="text">n</span></div>
                <div key="p"><span className="text">p</span></div> */

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