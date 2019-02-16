/**
 * version: 1.0
 * 
 * auth:    Nicola Migliore
 * date:    2019-02-16
 * descr:   This file contains utility functions found online
 *          for getting event locations in the DOM.
 *
 */

function getElementPosition(obj){
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
}

function getElementEventLocation(event){
    /**
     * Returns event location object relative to an element
     */
    let pos = getElementPosition(event.target || event.srcElement);
    return {
        x: (event.clientX - (pos ? pos.x : 0)),
        y: (event.clientY - (pos ? pos.y : 0))
    }
}

