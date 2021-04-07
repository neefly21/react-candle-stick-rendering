import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class CandleStickCanvas extends Component {

    constructor()
    {
        super();        
        
        this.state = {
            blah: 1,
            candleStickData: [],
        }
    }

    componentDidMount() {

        var c = document.getElementById("myCanvas") !== null ? document.getElementById("myCanvas") : null;
        var ctx = c !== null ? c.getContext("2d") : null;

        if(ctx !== null || ctx !== undefined)
        {
            this.drawHorizontalGrid(ctx, 960, 540);
            
            for(var i = 0; i < 25; i++)
            {
                //Calculate scale of the candlesticks by total number / viewsize

                var candleStickOffset = Math.ceil(960/25);
                var candleStickHeight = this.getRandomInt(1,5);

                var isBullish = this.getRandomInt(1,100) % 2 === 0 ? true : false;

                var verticalOffsetRng = this.getRandomInt(1, 15);

                var verticalOffset = isBullish ? 270+(verticalOffsetRng) : 270-(verticalOffsetRng);

                this.drawRectangle(ctx, candleStickOffset*i, verticalOffset, candleStickOffset, candleStickHeight, isBullish);

            }
        }
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

    render()
    {        

        return(
            <div style={{padding: "5rem;"}}>
                <canvas id="myCanvas" width="960" height="540" style={{border: "1px solid #000000"}}></canvas>
            </div>
        );
    }

}

export default CandleStickCanvas