var Client = require('instagram-private-api').V1;
var device = new Client.Device('tpopenhouse2019');
var storage = new Client.CookieFileStorage(__dirname + '/someuser.json');
var _ = require('lodash');
var Promise = require('bluebird');
var TPHashtag= 'temasekpoly'

Client.Session.create(device, storage, 'tpopenhouse2019', 'rhsmusibot2k19')
	.then(function(session) 
	{

	})

function parseMillisecondsIntoReadableTime(milliseconds)
{
	//Get hours from milliseconds
	var hours = milliseconds / (1000*60*60);
	var absoluteHours = Math.floor(hours);
	var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
  
	//Get remainder from hours and convert to minutes
	var minutes = (hours - absoluteHours) * 60;
	var absoluteMinutes = Math.floor(minutes);
	var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
  
	//Get remainder from minutes and convert to seconds
	var seconds = (minutes - absoluteMinutes) * 60;
	var absoluteSeconds = Math.floor(seconds);
	var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
  
	return h + ':' + m + ':' + s;
}

function instainfo(instainfo_callback) 
{
	//var TPHashtag= 'rhstpopenhouse2019'
	var session = new Client.Session(device, storage)
	var feed = new Client.Feed.TaggedMedia(session, TPHashtag);

	Promise.mapSeries(_.range(0, 1), function() 
	{
		return feed.get();
	})
	.then(function(results) 
	{
		// result should be Media[][]
		var mediaFeed = _.flatten(results);
		/*
		var urls = _.map(mediaFeed, function(medium) 
		{
			if(!medium._params.images[0].url){
				return (medium._params.images[0][0].url);
			}
			return (medium._params.images[0].url);
		});
                   
        var likes = _.map(mediaFeed, function(medium) 
		{
			return (medium._params.likeCount);
		});

        var datePosted = _.map(mediaFeed, function(medium) 
		{
			return(medium._params.takenAt);
		});

		var postedBy = _.map(mediaFeed, function(medium) 
		{
			return(medium._params.user.username);
		});
		*/
		var instaObjs = _.map(mediaFeed, function(medium) 
		{
			var obj = {};
			if(!medium._params.images[0].url){
				obj.url = medium._params.images[0][0].url;
			}else{
				obj.url = medium._params.images[0].url;
			}
			obj.likeCount = medium._params.likeCount;
			obj.takenAt = medium._params.takenAt;
			obj.username = medium._params.user.username;
			return(obj);
		});

/*
        // ------------- Convert from milliseconds to Date -------//
		var milliToConvert = datePosted;
		
        new Date(+milliToConvert);
        const timeposted = new Date(parseInt(milliToConvert,10));
		module.exports.instagramPostedDate = timeposted;   
        // ------------------------------------------------------//
        
    	//------------ Convert milliseconds to Time ------//
		var time = parseMillisecondsIntoReadableTime();
        module.exports.instagramTimePosted = timeposted;
    	//-----------------------------------------------// 
*/
		console.log("total : " + instaObjs.length);
		//console.log("obj : " + instaObjs[0].url);			
		//console.log("total : " + postedBy.length);
		//console.log("total : " + urls.length);
		//console.log("total : " + likes.length);
		//console.log("total : " + datePosted.length);
		//console.log("datePosted : " + datePosted[0]);
		//console.log("datePosted : " + new Date(parseInt(datePosted[0],10)));
		//console.log("datePosted : " + parseMillisecondsIntoReadableTime(datePosted[0]));

		//module.exports.postedByName = postedBy;
        //module.exports.instagramURL = urls;
		//module.exports.instagramLikes = likes;
		//module.exports.datePosted = datePosted;
		instainfo_callback(instaObjs);
	})
}


module.exports.instainfo = instainfo;


