/* 
 * datab-is.js - module for testing whether objects are expected types
 *
 */

var is = function(a, expected){
    return Object.prototype.toString.call( a ) === expected;
}

var is_function = function(a){
    return is(a, '[object Function]');
}

var is_array = function(a){
    return is(a, '[object Array]');

}

var is_object = function(a){ return is(a, '[object Object]'); };

var is_matrix = function(a){

    if ( ! is_array(a) ) return false;

    var i = 0;

    throw new Error("datab.is.is_matrix not implemented!");
    
}

export default {
    "is_object":is_object,
    "is_array":is_array,
    "is_function":is_function
}
