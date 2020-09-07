var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./authTTR.json');
var table = require('cli-table2');
var package = require('./package.json');
var helping = require('./helpFile.json');

//Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

var checkChar = '~'; //The starting character for bot commands

bot.on('message', function (user, userID, channelID, message, evt) {
//if (message.author.bot) return;
if (message.substring(0, 1) == checkChar) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
	cmd.toLowerCase();
        switch(cmd) {
        	case 'invasion':
		case 'invasions':
        		const request = require("request");
        		request('https://www.toontownrewritten.com/api/invasions', function (error, response, body) {
        			let json = JSON.parse(body);
        			var x = 0;
        			var tt = "";
        			var nt2 = new table({
                        chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
                        style: {
                            head:[],
                            border:[]
                        },
                        colWidths:[16,18,12]
                    });
                    var nt1 = new table({
                        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                                 , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                                 , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                                 , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
                        style: {
                            head:[],
                            border:[]
                        },
                        colWidths:[16,18,12]
                    });
                    nt1.push(
                    	[{colSpan:1, hAlign:'center', content:'Location'}, {colSpan:1, hAlign:'center', content:'Cog Type'}, {colSpan:1, hAlign:'center', content:'Progress'}]);

                    if (Object.keys(json.invasions)[0] == undefined){ //Check if there are no invasions
                    	var xx = '```';
                    	nt2.push([{colSpan:3, hAlign:'center', content:'No Invasions'}]);
                    	bot.sendMessage({
	                    	to: channelID,
	                    	message: xx + nt2 + xx
	                	});
                    }
                    else {
	  					for (key in json.invasions){
	  						var printthis = [];
	  						var xx = '```'; //-- formats to css style
	  						var name = Object.values(json.invasions)[x].type.replace(/[^\x00-\x7F]/g,'');
							if (name[0] == 'M' && name[1] == 'i'){
								name = 'Micromanager';
							}
							if (name[0] == 'T' && name[1] == 'e'){
								name = 'Telemarketer';
							}
							if (name[0] == 'B' && name[1] == 'l'){
								name = 'Bloodsucker';
							}
	  						nt2.push(
	  							[Object.keys(json.invasions)[x], name, {colSpan:1, hAlign:'right',content:Object.values(json.invasions)[x].progress}]
	  							);
	  						//var tt = tt + Object.keys(json.invasions)[x] + " | " + Object.values(json.invasions)[x].type + " | (" + Object.values(json.invasions)[x].progress + ")" + '\n\n';
	  						//console.log("Server " + Object.keys(json.invasions)[x] + " has cog " + Object.values(json.invasions)[x].type + " invading it."); 
	  						x++;
						}
						bot.sendMessage({
	                    	to: channelID,
	                    	message: xx + 'ml\n'+ nt1 + '\n' + nt2 + xx
	                	});
					}
				});
            break;
            case 'help':
                    bot.sendMessage({
                        to: channelID,
                        message: '*My current list of commands are:*' + '\n```ml\n' + helping.testing + '```'
                    });
            break;
            case 'patchnotes':
            	const request2 = require("request");
            	request2('https://www.toontownrewritten.com/api/releasenotes', function (error, response, body) {

	  				let json = JSON.parse(body);
	  				x = Object.values(json)[0].noteId;
	  				var footer = "\n*Patchnotes Version: " + Object.values(json)[0].slug + "    Date: " + Object.values(json)[0].date + "*"
	  				var usethis = 'https://www.toontownrewritten.com/api/releasenotes/' + x;
	       
	           console.log(usethis);
	  				request2(usethis, function(error, response, body){
						let json2 = JSON.parse(body);
						var x = (json2.body);

						var ret1 = x.replace(/<u>/g,'');
						var ret2 = ret1.replace(/<\/u>/g,'');
						var ret3 = ret2.replace(/<b>/g,'**');
						var ret4 = ret3.replace(/<\/b>/g,'**');
						var ret5 = ret4.replace(/<br \/>/gm,'');
						//var ret6 = x.replace(/(\r\n|\n|\r)/gm," "); //q remove end line statements
						console.log(ret5);
						console.log('The character message of the patch note is: ' + ret5.length);
						bot.sendMessage({
							to: channelID,
							message: ret5 + footer
						});
					});
				});
			break;
			case 'about':
				var version = package.version;
				var author = package.author;
				var description = package.description;
				
				var toSend = description + '\n\n' + 'Author: ' + author + '     Version: ' + version + '*'
				bot.sendMessage({
                    to: channelID,
                    message: toSend
                });
			break;
	    /*case 'news':
		const request3 = require("request");
                request3('https://www.toontownrewritten.com/api/news', function (error, response, body) {

                                        let json = JSON.parse(body);
                                        x = json.postId;
                                        var footer = "\n*News Update Number: " + x  + "    Date: " + json.date + "*";
                                        var usethis = 'https://www.toontownrewritten.com/api/news/' + x;

					/*request3(usethis = function(error, response, body){
					let json2 = JSON.parse(body);
					var x = (json2.body);
					

                                        var bodies = Object.values(json)[0].body
					var author = 'Author: ' + json.author

                                                /*var ret1 = bodies.replace(/<p>/g,'');
                                                var ret2 = ret1.replace(/<\/p>/g,'\n');
                                                var ret3 = ret2.replace(/<strong>/g,'**');
                                                var ret4 = ret3.replace(/<\/strong>/g,'**');
                                                var ret5 = ret4.replace(/<span>/g,'');
						
                                                //var ret6 = x.replace(/(\r\n|\n|\r)/gm," "); //q remove end line statements 
						console.log(bodies);
                                                bot.sendMessage({
                                                        to: channelID,
                                                        //message: ret5 + footer
							message: json.body
                                                });
                                        });
                               // });
                        break;*/
            case 'test':
                    bot.sendMessage({
                        to: channelID,
                        message: '```css\nThis is a test!```'
                    });
            break;
            default:
                bot.sendMessage({to: channelID, message: '*That is not a function! Type ' + checkChar + 'help for commands.*'});
            break;
        }
    }
});
