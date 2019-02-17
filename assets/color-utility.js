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
     * 
     * @param   {string}  rgba       RGBA rappresentation
     */
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


/**
 * Found online.
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function getRGBFromHSL(h, s, l){
    var r, g, b;
    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

