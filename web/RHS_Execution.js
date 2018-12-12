var tools = require("./RHS_Maincode.js");
var value = tools.instainfo();
//console.log("Value: "+value);



// of a McDonald's drive-through queue
/*let getQueueLength = function() 
{  
    return value;
};*/

// We would like to retrieve the queue length at regular intervals
// this way, we can decide when to make a quick dash over
// at the optimal time
setInterval(function() 
            {  
    console.log(`1 minute buffer.`);
    //let queueLength = getQueueLength();

    
    tools.instainfo();
    
    /*if (queueLength === 0) 
    {
        tools.instainfo();
    }*/

   
}, 5000);