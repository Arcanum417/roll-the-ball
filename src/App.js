import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import './styles.css';
import './example-styles.css';
//import './styles-resizable.css';
const ReactGridLayout = WidthProvider(RGL);

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
        {i: 'a', x: 0, y: 0, w: 1, h: 1},
        {i: 'b', x: 1, y: 0, w: 1, h: 1,static: true},
        {i: 'c', x: 2, y: 0, w: 1, h: 1},
        {i: 'd', x: 3, y: 0, w: 1, h: 1,},
        {i: 'e', x: 0, y: 1, w: 1, h: 1},
        {i: 'f', x: 1, y: 1, w: 1, h: 1},
        {i: 'g', x: 2, y: 1, w: 1, h: 1,},
        {i: 'h', x: 3, y: 1, w: 1, h: 1},
        {i: 'j', x: 1, y: 2, w: 1, h: 1},
        {i: 'k', x: 2, y: 2, w: 1, h: 1},
        {i: 'l', x: 3, y: 2, w: 1, h: 1},
        {i: 'm', x: 0, y: 3, w: 1, h: 1},
        {i: 'n', x: 1, y: 3, w: 1, h: 1},
        {i: 'p', x: 3, y: 3, w: 1, h: 1, static: true}
    ];

const originalLayout = getFromLS('layout') || layoutStatic;
class NoCompactingLayout extends React.PureComponent {

    constructor(props) {
        super(props);

        var score = 9;

        this.state = {
            layout: JSON.parse(JSON.stringify(originalLayout))
        };
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.resetLayout = this.resetLayout.bind(this);
    }

    resetLayout() {
        this.setState({
            layout: layoutStatic
        });
        console.log("nope");
    }

    onLayoutChange(layout) {
        console.log("onLayoutChange!", layout);
        saveToLS('layout', layout);
        this.setState({layout});
        //this.props.onLayoutChange(layout);

    }

   onDragStart(thing, thing2, thing3, thing4, thing5, thing6)   {
        console.log(thing, thing2, thing3, thing4, thing5, thing6);
    }

    generateDOM() {
        return _.map(_.range(this.props.items), function(i) {
            return (<div key={i}><span className="text">{i}</span></div>);
        });
    }
    generateDOMItem(keyp,imageSource,rotate){
        return (
            <div key={keyp}><img src={"img/" + imageSource } className={"rotate" + rotate + " gridItemImg"} /></div>
    )
    }

    render() {
        return (
            <div>
            <ReactGridLayout layout={this.state.layout}
                             onLayoutChange={this.onLayoutChange}
                             cols={4}
                             rowHeight={100}
                             maxRows={4}
                             isResizable={false}
                             autoSize={true}
                             compactType={null}
                             preventCollision={true}
                             margin={[0,0]}
                             {...this.props}
            >
                {this.generateDOMItem("a","box.png",0)}
                {this.generateDOMItem("b","start.png",180)}
                {this.generateDOMItem("c","box.png",0)}
                {this.generateDOMItem("d","box.png",0)}
                {this.generateDOMItem("e","box.png",0)}
                {this.generateDOMItem("f","direct.png",0)}
                {this.generateDOMItem("g","box.png",0)}
                {this.generateDOMItem("h","box.png",0)}
                {this.generateDOMItem("j","box.png",0)}
                {this.generateDOMItem("k","turn.png",0)}
                {this.generateDOMItem("l","turn.png",180)}
                {this.generateDOMItem("m","box.png",0)}
                {this.generateDOMItem("n","turn.png",0)}
                {this.generateDOMItem("p","finish.png",270)}


            </ReactGridLayout>
            <button onClick={this.resetLayout}>Reset Layout</button>
            </div>
        );
    }
}

/*   <button onClick={this.resetLayout}>Reset Layout</button>
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