import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import './styles.css';
import './example-styles.css';
//import './styles-resizable.css';
const ReactGridLayout = WidthProvider(RGL);

class NoCompactingLayout extends React.PureComponent {
    static propTypes = {
        onLayoutChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        className: "layout",
        cols: 4   ,
        rowHeight: 100,
        width: 200,
        isResizable: false,
        autoSize: false,
        onLayoutChange: function() {},
        // This turns off compaction so you can place items wherever.
        verticalCompact: false,
        // This turns off rearrangement so items will not be pushed arround.
        preventCollision: true
    };

    constructor(props) {
        super(props);

        const layout =
            [
                {i: 'a', x: 0, y: 0, w: 1, h: 1,},
                {i: 'b', x: 1, y: 0, w: 1, h: 1},
                {i: 'c', x: 2, y: 0, w: 1, h: 1},
                {i: 'd', x: 3, y: 0, w: 1, h: 1,},
                {i: 'e', x: 0, y: 1, w: 1, h: 1},
                {i: 'f', x: 1, y: 1, w: 1, h: 1},
                {i: 'g', x: 2, y: 1, w: 1, h: 1,},
                {i: 'h', x: 3, y: 1, w: 1, h: 1},
                {i: 'j', x: 1, y: 2, w: 1, h: 1,},
                {i: 'k', x: 2, y: 2, w: 1, h: 1},
                {i: 'l', x: 3, y: 2, w: 1, h: 1},
                {i: 'm', x: 0, y: 3, w: 1, h: 1,},
                {i: 'n', x: 1, y: 3, w: 1, h: 1},
                {i: 'p', x: 3, y: 3, w: 1, h: 1}
            ];
        this.state = { layout };
    }

    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
    }

    generateDOM() {
        return _.map(_.range(this.props.items), function(i) {
            return (<div key={i}><span className="text">{i}</span></div>);
        });
    }

    render() {
        return (
            <ReactGridLayout layout={this.state.layout} onLayoutChange={this.onLayoutChange}
                             {...this.props}>
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
                <div key="p"><span className="text">p</span></div>
            </ReactGridLayout>
        );
    }
}
export default NoCompactingLayout;