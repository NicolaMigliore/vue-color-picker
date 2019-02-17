/**
 * version: 1.0
 * 
 * auth:    Nicola Migliore
 * date:    2019-02-12
 * descr:   Main js file for the app
 *
 */

var app = new Vue({
    el: '#color-picker',
    data: {
        canvas: null,
        ctx: null,
        canvasW: 200,
        canvasH: 200,
        logText: '',
        curColor: 'rgb(100,100,100)',
        selColor: 'rgb(100,100,100)',
        hue: null,
        saturation: 50,
        lightness: 50
    },
    methods: {
        print: function(str){
            console.log(str);
            if(str){
                this.logText = str.toString(); 
            }
        },
        setupCanvas: function(){
            this.print('Starting setup...');
            this.canvas = document.getElementById('color-pallet'),
            this.ctx = this.canvas.getContext('2d');

            this.ctx.fillStyle = '#FF0000';
            this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
            this.print('Done setting up!');
        },
        setGradient: function(){
            //Horizontal gradient with colorStops for VIBGYOR colors
            var grdH = this.ctx.createLinearGradient(0,0,this.canvasW,0);
            grdH.addColorStop(0, 'rgba(148,0,211,1)');                   //Violet
            grdH.addColorStop(0.1428, 'rgba(75,0,130,1)');               //Indigo
            grdH.addColorStop(0.2857, 'rgba(0,0,255,1)');                //Blue
            grdH.addColorStop(0.4285, 'rgba(0,255,0,1)');                //Green
            grdH.addColorStop(0.5714, 'rgba(255,255,0,1)');              //Yellow
            grdH.addColorStop(0.7142, 'rgba(255,127,0,1)');              //Orange
            grdH.addColorStop(1, 'rgba(255,0,0,1)');                     //Red

            this.ctx.fillStyle = grdH;
            this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);

            //Setup hue value and saturation and lightness rangeInput
            this.setHue(this.selColor);
        },
        getMouseColor: function(event){
            /**
             * returnes the current color from an event on the given element
             */
            let elem = event.target || event.srcElement;
            // let eventCoords = this.getElementEventLocation(event);
            let eventCoords = getElementEventLocation(event);
            let pixelData = this.ctx.getImageData(eventCoords.x, eventCoords.y, 1, 1);

            return 'rgba('+pixelData.data[0]+','+pixelData.data[1]+','+pixelData.data[2]+','+pixelData.data[3]+')';

        },
        setHue: function(rgba){
            this.hue = getHueFromRGB(rgba);
            console.log('Current Hue: ', this.hue);
        },
        setColor : function(){
            /**
             * Using the current hue, saturation and lightness 
             * values sets the selected color value
             */
            let channes = getRGBFromHSL(this.hue / 360, this.saturation / 100, this.lightness / 100);
            this.selColor = 'rgb(' +channes[0] + ',' + channes[1] +',' + channes[2] + ')';
        }

    }
})


app.setupCanvas();
app.setGradient();

