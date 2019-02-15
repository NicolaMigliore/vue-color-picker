

var app = new Vue({
    el: '#color-picker',
    data: {
        canvas: null,
        ctx: null,
        canvasW: 200,
        canvasH: 200,
        logText: '',
        curColor: 'rgba(100,100,100,1)',
        selColor: '',
        hue: 'rgba(255,0,0,0.5)'
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

            //Other setup
            console.log(this.ctx);
        },
        setGradient: function(){
            //Vertical gradient
            //var grdV = this.ctx.createLinearGradient(0,0,0,this.canvasH);
            // var grdV1 = this.ctx.createLinearGradient(0,0,0,this.canvasH);
            // grdV1.addColorStop(0, 'white');
            // grdV1.addColorStop(1, 'black');
            // var grdV2 = this.ctx.createLinearGradient(this.canvasW,0,this.canvasW,this.canvasH);
            // grdV2.addColorStop(0, this.hue);
            // grdV2.addColorStop(1, 'black');


            //Horizontal gradient with colorStops for VIBGYOR colors
            var grdH = this.ctx.createLinearGradient(0,0,this.canvasW,0);
            grdH.addColorStop(0, 'rgba(148,0,211,1)');              //Violet
            grdH.addColorStop(0.1428, 'rgba(75,0,130,1)');               //Indigo
            grdH.addColorStop(0.2857, 'rgba(0,0,255,1)');                //Blue
            grdH.addColorStop(0.4285, 'rgba(0,255,0,1)');                //Green
            grdH.addColorStop(0.5714, 'rgba(255,255,0,1)');              //Yellow
            grdH.addColorStop(0.7142, 'rgba(255,127,0,1)');              //Orange
            grdH.addColorStop(1, 'rgba(255,0,0,1)');                //Red

            //Apply gradients
            // this.ctx.fillStyle = grdV1;
            // this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
            
            // this.ctx.fillStyle = grdV2;
            // this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);

            this.ctx.fillStyle = grdH;
            this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
        },
        getElementPosition: function(obj){
            /**
             * Return the location of the element (x,y) being relative to the document.
             * 
             * @param {Element} obj Element to be located
             */
            var curleft = 0, curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
                return { x: curleft, y: curtop };
            }
            return undefined;
        },
        getElementEventLocation: function(event){
            /**
             * Returns event location object relative to an element
             */
            //let pos = this.getElementPosition(elem);
            let pos = this.getElementPosition(event.target || event.srcElement);
            return {
                x: (event.clientX - (pos ? pos.x : 0)),
                y: (event.clientY - (pos ? pos.y : 0))
            }
        },
        getMouseColor: function(event){
            /**
             * returnes the current color from an event on the given element
             */
            let elem = event.target || event.srcElement;
            let eventCoords = this.getElementEventLocation(event);
            let pixelData = this.ctx.getImageData(eventCoords.x, eventCoords.y, 1, 1);
            console.log(pixelData);
            return 'rgba('+pixelData.data[0]+','+pixelData.data[1]+','+pixelData.data[2]+','+pixelData.data[3]+')';
        }
    }
})


app.setupCanvas();

app.setGradient();

