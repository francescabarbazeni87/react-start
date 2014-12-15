var React = require('react');

var SpeedMeter = React.createClass({
    classNames: ['speed-meter'],
    layoutName: 'components/speed-meter',
    control_target: null,
    control_width: 300,
    control_height: 150,
    control_speed: 80,
    rateSize: 100,

    iCurrentSpeed:50,
    iTargetSpeed:50,
    bDecrement:null,
    job:null,

    getInitialState: function() {
        return {speed: 80};
    },

     degToRad:function(angle)
     {
        // Degrees to radians
        return ((angle * Math.PI) / 180);
    },

radToDeg:function(angle)
    {
        // Radians to degree
        return ((angle * 180) / Math.PI);
    },

    createLine:function(fromX, fromY, toX, toY, fillStyle, lineWidth, alpha)
    {
        // Create a line object using Javascript object notation
        return {
            from: {
                X: fromX,
                Y: fromY
            },
            to:	{
                X: toX,
                Y: toY
            },
            fillStyle: fillStyle,
            lineWidth: lineWidth,
            alpha: alpha
        };
    },


drawLine:function(options, line)
     {
        // Draw a line using the line object passed in
        options.ctx.beginPath();

        // Set attributes of open
        options.ctx.globalAlpha = line.alpha;
        options.ctx.lineWidth = line.lineWidth;
        options.ctx.fillStyle = line.fillStyle;
        options.ctx.strokeStyle = line.fillStyle;
        options.ctx.moveTo(line.from.X, line.from.Y);

        // Plot the line
        options.ctx.lineTo(
            line.to.X,
            line.to.Y
        );

        options.ctx.stroke();
    },

    createPolygon:function(options, fromX, fromY, toX, toY)
    {
        options.ctx.fillStyle = '#f00';
        options.ctx.beginPath();
        options.ctx.moveTo(fromX+3, fromY+3);
        options.ctx.lineTo(toX,toY);
        options.ctx.lineTo(fromX-3,fromY-3);
        options.ctx.closePath();
        options.ctx.fill();
    },

    drawBackground:function(options)
    {
        /* Black background with alphs transparency to
         * blend the edges of the metallic edge and
         * black background
         */

        //background-color: rgba(245, 245, 245, 0.4); border: 0px

        options.ctx.globalAlpha = 0.6;
        options.ctx.fillStyle = "rgba(245, 245, 245, 0.9); border: 0px";

        var i = (170 / 100) * Number(this.rateSize),
            i_max = (180 / 100) * Number(this.rateSize);


        // Draw semi-transparent circles
        for (i ; i < i_max ; i++)     // (var i = 170; i < 180 ; i++)
        {
            options.ctx.beginPath();

            options.ctx.arc(options.center.X,
                options.center.Y,
                    1 * i, 0,
                Math.PI,
                true);

            options.ctx.fill();
        }
    },

     applyDefaultContextSettings:function(options)
    {
        /* Helper function to revert to gauges
         * default settings
         */

        options.ctx.lineWidth = 2;
        options.ctx.globalAlpha = 0.5;
        options.ctx.strokeStyle = "rgb(255, 255, 255)";
        options.ctx.fillStyle = 'rgb(255,255,255)';
    },


     drawSmallTickMarks:function(options)
    {
        /* The small tick marks against the coloured
         * arc drawn every 5 mph from 10 degrees to
         * 170 degrees.
         */

        var tickvalue = options.levelRadius - 8;
        var iTick = 0;
        var gaugeOptions = options.gaugeOptions;
        var iTickRad = 0;

        this.applyDefaultContextSettings(options);



        // Tick every 20 degrees (small ticks)
        for (iTick = 10; iTick < 180; iTick += 20)
        {
            iTickRad = this.degToRad(iTick);

            /* Calculate the X and Y of both ends of the
             * line I need to draw at angle represented at Tick.
             * The aim is to draw the a line starting on the
             * coloured arc and continueing towards the outer edge
             * in the direction from the center of the gauge.
             */

            var onArchX = gaugeOptions.radius - (Math.cos(iTickRad) * tickvalue);
            var onArchY = gaugeOptions.radius - (Math.sin(iTickRad) * tickvalue);
            var innerTickX = gaugeOptions.radius - (Math.cos(iTickRad) * gaugeOptions.radius);
            var innerTickY = gaugeOptions.radius - (Math.sin(iTickRad) * gaugeOptions.radius);

            var fromX = (options.center.X - gaugeOptions.radius) + onArchX;
            var fromY = (gaugeOptions.center.Y - gaugeOptions.radius) + onArchY;

            var toX = (options.center.X - gaugeOptions.radius) + innerTickX;
            var toY = (gaugeOptions.center.Y - gaugeOptions.radius) + innerTickY;

            // Create a line expressed in JSON
            var line = this.createLine(fromX, fromY, toX, toY, "rgba(0, 0, 0, 0.8)", 2, 0.6);

            // Draw the line
            this.drawLine(options, line);

        }
    },

     drawLargeTickMarks:function(options)
    {
        /* The large tick marks against the coloured
         * arc drawn every 10 mph from 10 degrees to
         * 170 degrees.
         */

        var tickvalue = options.levelRadius - 8;
        var iTick = 0;
        var gaugeOptions = options.gaugeOptions;
        var iTickRad = 0;

        var innerTickY;
        var innerTickX;
        var onArchX;
        var onArchY;

        var fromX;
        var fromY;

        var toX;
        var toY;
        var line;

        this.applyDefaultContextSettings(options);
        tickvalue = options.levelRadius + 2;
        //tickvalue = options.levelRadius - 2;

        // 10 units (major ticks)
        for (iTick = 20; iTick < 180; iTick += 20)
        {
            iTickRad = this.degToRad(iTick);

            /* Calculate the X and Y of both ends of the
             * line I need to draw at angle represented at Tick.
             * The aim is to draw the a line starting on the
             * coloured arc and continueing towards the outer edge
             * in the direction from the center of the gauge.
             */

            onArchX = gaugeOptions.radius - (Math.cos(iTickRad) * tickvalue);
            onArchY = gaugeOptions.radius - (Math.sin(iTickRad) * tickvalue);
            innerTickX = gaugeOptions.radius - (Math.cos(iTickRad) * gaugeOptions.radius);
            innerTickY = gaugeOptions.radius - (Math.sin(iTickRad) * gaugeOptions.radius);

            fromX = (options.center.X - gaugeOptions.radius) + onArchX;
            fromY = (gaugeOptions.center.Y - gaugeOptions.radius) + onArchY;

            toX = (options.center.X - gaugeOptions.radius) + innerTickX;
            toY = (gaugeOptions.center.Y - gaugeOptions.radius) + innerTickY;

            // Create a line expressed in JSON
            line = this.createLine(fromX, fromY, toX, toY, "rgba(0, 0, 0, 0.8)", 1, 0.6);

            // Draw the line
            this.drawLine(options, line);
        }
    },

    drawTicks:function(options)
    {
        /* Two tick in the coloured arc!
         * Small ticks every 5
         * Large ticks every 10
         */

        this.drawSmallTickMarks(options);
        this.drawLargeTickMarks(options);
    },


     drawTextMarkers:function(options)
    {
        /* The text labels marks above the coloured
         * arc drawn every 10 mph from 10 degrees to
         * 170 degrees.
         */


        var innerTickX = 0;
        var innerTickY = 0;
        var iTick = 0;
        var gaugeOptions = options.gaugeOptions;
        var deltaRadius = (gaugeOptions.radius/10); // 10
        var radius = gaugeOptions.radius +deltaRadius ;
        var iTickToPrint = 10;
        //var delta = 180/10;

        this.applyDefaultContextSettings(options);

        // Font styling
        options.ctx.font = 'bold 11px digital';

        //options.ctx.font = 'italic 11px sans-serif';
        options.ctx.textBaseline = 'top';
        options.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";

        options.ctx.beginPath();

        // Tick every 20 (small ticks)
        for (iTick = 10; iTick <= 180; iTick += 20)
        {
//            innerTickX = gaugeOptions.radius - (Math.cos(this.degToRad(iTick)) * gaugeOptions.radius);
//            innerTickY = gaugeOptions.radius - (Math.sin(this.degToRad(iTick)) * gaugeOptions.radius);

            innerTickX = radius - (Math.cos(this.degToRad(iTick)) * radius);
            innerTickY = radius - (Math.sin(this.degToRad(iTick)) * radius);


            options.ctx.fillText(iTickToPrint, (options.center.X - radius - (deltaRadius/2) ) + innerTickX ,
                    (gaugeOptions.center.Y - radius -deltaRadius ) + innerTickY );


//            // Some cludging to center the values (TODO: Improve)
//            if(iTick )       {
//                options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX,
//                        (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY + 5);
//            }
//            if(iTick < 50)
//            {
//                options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX - 5,
//                        (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY + 5);
//            }
//            else if(iTick < 90)
//            {
//                options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX,
//                        (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY );
//            }
//            else if(iTick === 90)
//            {
//                options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX + 4,
//                        (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY );
//            }
//            else if(iTick < 145)
//            {
//                options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX + 10,
//                        (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY );
//            }
//            else
//            {
//                options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX + 15,
//                        (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY + 5);
//            }

            // MPH increase by 10 every 20 degrees
            iTickToPrint += 10;
        }

        options.ctx.stroke();

    },



     drawNeedleDial:function(options, alphaValue, strokeStyle, fillStyle)
    {
        /* Draws the metallic dial that covers the base of the
         * needle.
         */

        options.ctx.globalAlpha = alphaValue;
        options.ctx.lineWidth = 1;
        //options.ctx.strokeStyle = strokeStyle;
        options.ctx.fillStyle = fillStyle;

        // Draw several transparent circles with alpha
        for (var i = 0;i < 30; i++)
        {
            options.ctx.beginPath();

            options.ctx.arc(options.center.X,
                options.center.Y,
                    1*i,
                0,
                Math.PI,
                true);

            options.ctx.fill();

            options.ctx.stroke();
        }
    },

     convertSpeedToAngle:function(options)
    {
        /* Helper function to convert a speed to the
         * equivalent angle.
         */
        var delta = 180/10;
        var iSpeed = (options.speed / 10),
            iSpeedAsAngle = (iSpeed * delta)  % 180;


        // Ensure the angle is within range
        if (iSpeedAsAngle > 180) {
            iSpeedAsAngle = iSpeedAsAngle - 180;
        } else if (iSpeedAsAngle < 0) {
            iSpeedAsAngle = iSpeedAsAngle + 180;
        }

        return iSpeedAsAngle;
    },

     drawNeedle:function(options)
    {
        /* Draw the needle in a nice read colour at the
         * angle that represents the options.speed value.
         */

        var iSpeedAsAngle = this.convertSpeedToAngle(options);
        var iSpeedAsAngleRad = this.degToRad(iSpeedAsAngle);

        var gaugeOptions = options.gaugeOptions;

        var innerTickX = gaugeOptions.radius - (Math.cos(iSpeedAsAngleRad) * 20);
        var innerTickY = gaugeOptions.radius - (Math.sin(iSpeedAsAngleRad) * 20);

        var fromX = (options.center.X - gaugeOptions.radius) + innerTickX;
        var fromY = (gaugeOptions.center.Y - gaugeOptions.radius) + innerTickY;

        var endNeedleX = gaugeOptions.radius - (Math.cos(iSpeedAsAngleRad) * gaugeOptions.radius);
        var endNeedleY = gaugeOptions.radius - (Math.sin(iSpeedAsAngleRad) * gaugeOptions.radius);

        var toX = (options.center.X - gaugeOptions.radius) + endNeedleX;
        var toY = (gaugeOptions.center.Y - gaugeOptions.radius) + endNeedleY;

        this.createPolygon(options, fromX, fromY, toX, toY);

        // Two circle to draw the dial at the base (give its a nice effect?)
        this.drawNeedleDial(options, 0.6, 1, "rgba(114, 124, 128, 0.8)");
        //this.drawNeedleDial(options, 0.2, "rgb(127, 127, 127)", "rgb(127,127,127)");

    },



     buildOptionsAsJSON:function(canvas, iSpeed)
    {
        /* Setting for the speedometer
         * Alter these to modify its look and feel
         */

        var centerX = (210/100)* Number(this.rateSize),
            centerY = (210/100)* Number(this.rateSize),
            radius = (140/100)* Number(this.rateSize),
            outerRadius = (200/100)* Number(this.rateSize);


//        var centerX = 147,//168,
//            centerY = 147,//168,
//            radius = 98,  //112
//            outerRadius = 140;//160;

        // Create a speedometer object using Javascript object notation
        return {
            ctx: canvas.getContext('2d'),
            speed: iSpeed,
            center:	{
                X: centerX,
                Y: centerY
            },
            levelRadius: radius - 10,
            gaugeOptions: {
                center:	{
                    X: centerX,
                    Y: centerY
                },
                radius: radius
            },
            radius: outerRadius
        };
    },


     clearCanvas:function(options)
    {
        options.ctx.clearRect(0, 0, 800, 600);
        this.applyDefaultContextSettings(options);
    },

//    MAIN


    draw:function(iSpeed, target)
    {
        /* Main entry point for drawing the speedometer
         * If canvas is not support alert the user.
         */

        var canvas = document.getElementById(target);

        // Canvas good?
        if (canvas != null && canvas.getContext)
        {
            var options = this.buildOptionsAsJSON(canvas, iSpeed);

            // Clear canvas
            this.clearCanvas(options);

            // Draw the metallic styled edge
            //this.drawMetallicArc(options);

            // Draw thw background
            this.drawBackground(options);

            // Draw tick marks
            this.drawTicks(options);

            // Draw labels on markers
            this.drawTextMarkers(options);

            // Draw speeometer colour arc
            //this.drawSpeedometerColourArc(options);

            // Draw the needle and base
            this.drawNeedle(options);

        }
        else
        {
            alert("Canvas not supported by your browser!");
        }
    },



    componentDidMount: function() {
        var txtSpeed = document.getElementById('SpeedMeter');

            this.iTargetSpeed = this.state.speed;

            // Sanity checks
            if (isNaN(this.iTargetSpeed)) {
                this.iTargetSpeed = 0;
            } else if (this.iTargetSpeed < 0) {
                this.iTargetSpeed = 0;
            } else if (this.iTargetSpeed > 80) {
                this.iTargetSpeed = 80;
            }

            this.job = setTimeout("draw()", 5);



    },

    render: function() {
        this.draw(this.control_speed, this.control_target);
//        return (
//            <div id='SpeedMeter' ></div>
//
//            );
    }
});



module.exports = SpeedMeter;
