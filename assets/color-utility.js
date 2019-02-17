/**
 * version: 1.0
 * 
 * auth:    Nicola Migliore
 * date:    2019-02-16
 * descr:   This file contains utility functions for working with colors.
 *
 */

function getHueFromRGB(rgba){
    /**
     * Return the HUE value from a givver RGB/RGBA string.
     * Found online.
     */
console.log('check');
    let r, g, b, min, max, hue;
    rgba = rgba.substring(rgba.indexOf('(') + 1, rgba.length);
    rgba = rgba.substring(0, rgba.indexOf(')'));

    [r,g,b] = rgba.split(',');              //Deconstruct channels into varibles
    
    min = Math.min(r, Math.min(g,b));
    max = Math.max(r, Math.max(g,b));

    if(min === max){
        hue = 0;
    }else if(max === r){
        hue =(g - b) / (max - min);
    }else if(max == g){
        hue = (b - r) / (max - min);
    }else{
        hue = (r - g) / (max - min);
    }

    hue = hue * 60;
    hue = (hue < 0) ? (hue + 360) : hue;

    return Math.round(hue);
}

