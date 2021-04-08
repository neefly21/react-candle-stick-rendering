import React, {Component} from 'react';
import $ from "jquery";

class CandleStickCanvas extends Component {

    constructor(props)
    {
        super(props);        
        
        this.state = {
            blah: 1,
            candleStickData: [],
            canvasWidthScale: 100,
            canvasHeightScale: 100
        }

        this.canvasRef = React.createRef();
        this.decrementScale = this.decrementScale.bind(this);
        this.incrementScale = this.incrementScale.bind(this);
        this.drawHorizontalGrid = this.drawHorizontalGrid.bind(this);
        this.drawRectangle = this.drawRectangle.bind(this);
        this.getCanvasContext = this.getCanvasContext.bind(this);
        this.getCSVData = this.getCSVData.bind(this);
        this.handleMouse = this.handleMouse.bind(this);
    }

    handleScroll(e)
    {
        debugger;
    }

    handleMouse(e)
    {
        console.log(e);
    }

    getCSVData() {
        $.ajax({
            type: "GET",
            url: "My api that I can deploy and keep as the asset that could potentially farm and handle storing hard finance data",
            dataType: "text",
            success: function(data) {
                debugger;
                this.processData(data);
            }
        });
    }
    
    processData(allText) {
        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];
    
        for (var i=1; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
            if (data.length == headers.length) {
    
                var tarr = [];
                for (var j=0; j<headers.length; j++) {
                    tarr.push(headers[j]+":"+data[j]);
                }
                lines.push(tarr);
            }
        }

        console.log(lines);
    }

    componentDidMount() {
        //this.getCSVData();

        var ctx = this.getCanvasContext();
        this.renderCandleStickExample(ctx);
    }

    componentDidUpdate() {
        const ctx = this.getCanvasContext();
        const cws = this.state.canvasWidthScale;
        const chs = this.state.canvasHeightScale; 
        ctx.scale(cws, chs);
        this.renderCandleStickExample(ctx);
    }

    renderCandleStickExample(ctx) {

        var cHeight = 540, cWidth = 960;

        this.drawHorizontalGrid(ctx, 960, 540);

        // for(var i = 0; i < 25; i++)
        // {
            //Calculate scale of the candlesticks by total number / viewsize
            //Effective - $0
            var effectiveBottom = Math.ceil(cHeight * 0.75); // if y == 405 == $0 = 1px = $1
            ctx.lineTo(cWidth, Math.ceil(cHeight * 0.75));

            //Given the following, how easily can we map this to the chart?
            //How accurate? (bonus)
            //Open	    High	Low	        Close       Adj Close
            //74.370003	75.57	73.589996	75.540001	73.892517

            var isBullish = this.getRandomInt(1, 25) % 2 ? true : false;

            ctx.beginPath();
            ctx.fillStyle = 'green';
            ctx.strokeStyle = 'green';
            ctx.lineStyle = 'green';
            


            var open = 74.37, close = 75.54, high = 75.57, low = 73.59, 
            x = 1, y = 74.37, csWidth = 1, csHeight = close-open, scale = 10,
            topShadow = close-high, bottomShadow=open-low;

            ctx.fillRect(x, effectiveBottom - open, csWidth*scale, csHeight*scale);

            var width = 2;

            //COORDINATES WILL BE FLIPPED SINCE Y- = UP
            //Top shadow
            ctx.moveTo(x + ((csWidth*scale)/2), (effectiveBottom - y));
            ctx.lineTo(x + ((csWidth*scale)/2), (effectiveBottom - y)-topShadow);

            ctx.fillText("$" + close, 150, (effectiveBottom - y)); 
            ctx.moveTo(x, (effectiveBottom - y)-topShadow);
            ctx.lineTo(960, (effectiveBottom - y)-topShadow);

            //Bottom Shadow
            ctx.moveTo(x + ((csWidth*scale)/2), (effectiveBottom - y));
            ctx.lineTo(x + ((csWidth*scale)/2), (effectiveBottom - y)+bottomShadow);

            ctx.stroke();

        // }
    }

    drawHorizontalGrid(ctx, cWidth, cHeight) {

        var lines = Math.ceil(cHeight/25);

        ctx.strokeStyle = 'black';

        //Effective - $0
        ctx.moveTo(0, Math.ceil(cHeight * 0.75));
        ctx.lineTo(cWidth, Math.ceil(cHeight * 0.75));

        var iterator = 0;
        for(var i = Math.ceil(cHeight * 0.75); i >= 0; i--)
        {
            if(iterator % 50 === 0) {
                ctx.lineFill = "grey";
                ctx.fillText("$" + iterator, cWidth - 35, i+10); 
                ctx.moveTo(0, i);
                ctx.lineTo(cWidth, i);
                ctx.stroke();
            }

            iterator++;
        }

        ctx.stroke();
    }

    getCanvasContext() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.scale(this.state.canvasWidthScale, this.state.canvasHeightScale);
        ctx.save();
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);

        if(ctx !== null || ctx !== undefined)
            return ctx;

        return null;
    }

    canvasExampleScene(ctx) {
        this.drawHorizontalGrid(ctx, 960, 540);
        this.drawRectangle(ctx, 0, 0, 100, 100, true)
    }

    decrementScale() {
        this.setState(prevState => ({
            canvasWidthScale: prevState.canvasWidthScale /= 1.1,
            canvasHeightScale: prevState.canvasHeightScale /= 1.1,
        }));
    }

    incrementScale() {
        this.setState(prevState => ({
            canvasWidthScale: prevState.canvasWidthScale *= 1.1,
            canvasHeightScale: prevState.canvasHeightScale *= 1.1,
        }));
    }

    drawRectangle(ctx, x, y, width, height, isBullish) {
        ctx.beginPath();
        ctx.fillStyle = isBullish ? 'green' : 'red';
        ctx.strokeStyle = isBullish ? 'green' : 'red';
        ctx.lineStyle = isBullish ? 'green': 'red';
        
        ctx.fillRect(x, y, width, height);

        //COORDINATES WILL BE FLIPPED SINCE Y- = UP
        //Top shadow
        ctx.moveTo(x+(width/2), y);
        ctx.lineTo(x+(width/2), y-(y-Math.ceil(y/2)));

        //Bottom Shadow
        ctx.moveTo(x+(width/2), y);
        ctx.lineTo(x+(width/2), y+(Math.ceil(y/2)))

        ctx.stroke();
    }

    drawVerticalGrid(ctx, width, height) {

        var lines = Math.ceil(width/50);

        for(var i = 0; i < lines; i++)
        {
            ctx.moveTo(i*50, 0);
            ctx.lineTo(i*50, height);
        }

        ctx.stroke();
    }

    drawStokeSquareOnCanvas(ctx, x, y, sideLength) {

        var topRightPoint = x + sideLength;
        var bottomYPoint = y + sideLength

        //squared drawn on canvas START AND END at x, y unchanged

        //No Change
        ctx.moveTo(x,y);
        ctx.lineTo(topRightPoint,y);

        //xpos+sidelength
        ctx.moveTo(x+sideLength,y);
        ctx.lineTo(topRightPoint,bottomYPoint);

        //xpos+sidelength - ypos+sidelength
        ctx.moveTo(x+sideLength,y+sideLength);
        ctx.lineTo(x,bottomYPoint);

        //ypos+sidelength
        ctx.moveTo(x,y+sideLength);
        ctx.lineTo(x, y);

        //render
        ctx.stroke();
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {        
        var disableDecrease = this.state.canvasWidthScale <= 1 ? true:false;
        return(
            <div>
                <canvas id="myCanvas" ref={this.canvasRef} width={960} height={540} onClick={this.handleMouse} onscroll={this.handleScroll} style={{border: "1px solid #000000"}}></canvas>
                <input type="button" onClick={this.decrementScale} value="-"/>
                <input type="button" onClick={this.incrementScale} value="+"/>
            </div>
        );
    }

}

export default CandleStickCanvas