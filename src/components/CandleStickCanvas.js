import React, {Component} from 'react';

class CandleStickCanvas extends Component {

    constructor()
    {
        super();        
        
        this.state = {
            blah: 1,
            candleStickData: [],
            canvasWidthScale: 1,
            canvasHeightScale: 1
        }

        this.decrementScale = this.decrementScale.bind(this);
        this.incrementScale = this.incrementScale.bind(this);
        this.drawHorizontalGrid = this.drawHorizontalGrid.bind(this);
        this.drawRectangle = this.drawRectangle.bind(this);
        this.getCanvasContext = this.getCanvasContext.bind(this);
        this.updateCanvasScale = this.updateCanvasScale.bind(this);
    }

    componentDidMount() {

        var ctx = this.getCanvasContext();
        this.canvasExampleScene(ctx);
    }

    drawRectangle(ctx, x, y, width, height, isBullish)
    {
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

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    drawHorizontalGrid(ctx, width, height)
    {

        var lines = Math.ceil(height/25);

        ctx.strokeStyle = 'black';

        for(var i = 0; i < lines; i++)
        {
            ctx.moveTo(0, i*25);
            ctx.lineTo(width, i*25);
        }

        ctx.stroke();
    }

    drawVerticalGrid(ctx, width, height)
    {

        var lines = Math.ceil(width/50);

        for(var i = 0; i < lines; i++)
        {
            ctx.moveTo(i*50, 0);
            ctx.lineTo(i*50, height);
        }

        ctx.stroke();
    }

    drawStokeSquareOnCanvas(ctx, x, y, sideLength)
    {

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

    decrementScale(e)
    {
        this.setState(state => ({
            canvasWidthScale: state.canvasWidthScale -= .1,
            canvasHeightScale: state.canvasHeightScale -= .1,
        }));

        this.updateCanvasScale();
    }

    incrementScale(e)
    {
        this.setState(state => ({
            canvasWidthScale: state.canvasWidthScale += .1,
            canvasHeightScale: state.canvasHeightScale += .1,
        }), this.updateCanvasScale());
    }

    updateCanvasScale(){
        var ctx = this.getCanvasContext();
        ctx.scale(this.state.canvasWidthScale, this.state.canvasHeightScale);
        this.canvasExampleScene(ctx);
    };

    getCanvasContext()
    {
        var c = document.getElementById("myCanvas") !== null ? document.getElementById("myCanvas") : null;
        var ctx = c !== null ? c.getContext("2d") : null;
        ctx.clearRect(0, 0, c.width, c.height);

        if(ctx !== null || ctx !== undefined)
            return ctx;

        return null;
    }

    canvasExampleScene(ctx)
    {
        this.drawHorizontalGrid(ctx, 960, 540);
        this.drawRectangle(ctx, 0, 0, 100, 100, true)
    }

    render()
    {        
        var disableDecrease = this.state.canvasWidthScale <= 1 ? true:false;
        //disabled={disableDecrease}
        return(
            <div>
                <canvas id="myCanvas" width={960} height={540} style={{border: "1px solid #000000"}}></canvas>
                <input type="button" onClick={this.decrementScale} value="-" />
                <input type="button" onClick={this.incrementScale} value="+"/>
            </div>
        );
    }

}

export default CandleStickCanvas