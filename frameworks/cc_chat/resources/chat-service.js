/**
 * This is from old Geniverse code. It should be greatly cleaned up.
 */

// quick hack for now
var channela = ""
var channelb = ""

ChatService = {

    comet:              null,

    // inits the chat server and connects to a channel
    // "arg" can be null, a string, or an array of strings.
    // <null> connects to a unique random channel, <string> connects to a
    // named channel, and an array connects to a random channel in that array
    initChat: function(arg){
     //   Faye.Logger("test")

        this.comet = new Faye.Client('/chat/comet');

        var channel = this.findChannel(arg);
        Chat.init(this.comet, channel);
        // console.log("connected to "+channel)

        return channel
    },

    setUsername: function(name){
        Chat.setUsername(name);
    },

    // callback is optional. If it is omitted, chats will use default
    // accept function and client list will also be subscribed to
    subscribe: function(arg, callback){
        var channel = this.findChannel(arg);
        if (arguments.length == 2){
            Chat.subscribe(channel, callback, true);
        } else {
            Chat.subscribe(channel, true);
            comet = Chat._comet;
            comet.subscribe('/smeta/clients'+channel, Chat.updateClientList, Chat);
        }

        return channel
    },

    // callback is optional. If it is omitted, standard clientListDiv
    // will be updated
    subscribeToUserList: function(channel, callback){
        channel = this.validate(channel);
        _channel = '/smeta/clients'+channel;
        comet = Chat._comet;
        _callback = callback || Chat.updateClientList;
        comet.subscribe(_channel, _callback, Chat);
    },

    subscribeToAdminChannel: function(channel){
        channel = this.validate(channel)+"/admin";
        comet = Chat._comet;
    //    var self = this;
      //  callback = function(message) { return self.acceptAdminCommand(message)}
        comet.subscribe(channel, this.acceptAdminCommand, Chat);
    },

    // doesn't really unsubscribe, just prevents your chats from
    // entering specified channel
    unsubscribe: function(channel){
        channel = this.validate(channel);
        Chat.stopChattingInChannel(channel);
    },

    // "arg" can be null, a string, or an array of strings.
    // <null> connects to a unique random channel, <string> connects to a
    // named channel, and an array connects to a random channel in that array
    findChannel: function(arg){
        var channel;
        if (arg == null){
            channel = "/random"+Math.floor(Math.random() * 10000);
        } else if ($.isArray(arg)){
            channel = arg[Math.floor(Math.random() * arg.length)];
        } else {
            channel = arg;
        }
        channel = this.validate(channel);
        return channel;
    },

    validate: function(channel){
        if (channel.slice(0,1) != "/")
            channel = "/"+channel;
        return channel;
    },

    // callback gets the name of the channel
    findChannelWithLeastClients: function(channels, callback){
        channela = channels[0];
        channelb = channels[1];


            handleCallback = function(num, channel){
                // console.log(num + " clients are connected to "+channel);
                this.switchChannels(channel, num);
                comet = Chat._comet;
                comet.unsubscribe('/smeta/clients'+channel)
            }

            clients = [];
            clients[channela] = -1;
            clients[channelb] = -1;

            switchChannels = function(channel, number){
                clients[channel] = number;
                if (clients[channela] > -1 && clients[channelb] > -1){
                    if (clients[channela] > clients[channelb]){
                        // console.log("returning "+channelb);
                        callback(channelb)
                    } else {
                        // console.log("returning "+channela);
                        callback(channela)
                    }
                }
            }

        this.clientsInChannel(channela, handleCallback);
        this.clientsInChannel(channelb, handleCallback);
    },

    // callback gets number of clients in channel
    clientsInChannel: function(channel, callback){
        (function(channel, callback){
            returnNumberOfClients = function(message){
                var numClients = [].concat(message);
                callback(numClients.length, channel);
            }

            // trans = Faye.Transport.get(this.comet);
            //        trans.send({
            //           channel:  '/meta/clients',
            //           id:       this._clientId,
            //           "real_channel":  channel,
            //         }, returnNumberOfClients, this);
            comet = Chat._comet;
            comet.subscribe('/smeta/clients'+channel, returnNumberOfClients, this);
        })(channel, callback)

    },

    post: function(channel, message){
        channel = this.validate(channel);
        Chat.post(message, channel);
    },

    postAdminCommand: function(channel, message){
        channel = this.validate(channel) + "/admin";
        Chat.post(message, channel);
    },

    acceptAdminCommand: function(message){
        if (message.freeze){
             jQuery.facebox.settings.opacity = 0.5;
             jQuery.facebox.settings.preventClose = true;
            div = $('<div>');
            div.append("Eyes forward please");
            jQuery.facebox(div);
        } else if (message.unfreeze){
            jQuery.facebox.close();
        }

        for (i in message.unsubscribe){
            var channel = message.unsubscribe[i];
            GenChatService.unsubscribe(channel);
        }

        for (i in message.subscribe){
            var channel = message.subscribe[i];
            GenChatService.subscribe(channel);
            $('#title').html(channel);
            GenView.setOrgPostingChannel(channel+'org');
            GenChatService.subscribeToUserList(channel);
            GenChatService.subscribeToAdminChannel(channel);
        }

        if (message.newAlleles != null){
            GenGWT.setAlleles(message.newAlleles);
        }
        
        if (message.clearAllDragons){
            GenView.clearAllDragons();
        }
    }

}

ChatService.Command = function(){
    this.unsubscribe = [];
    this.subscribe = [];
    this.freeze = false;
    this.unfreeze = false;
    this.newGoal = null;
    this.newAlleles = null;
    this.clearAllDragons = false;
}