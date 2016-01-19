Messages = new Mongo.Collection('messages1');

if (Meteor.isClient) {
  Meteor.subscribe("messages1");

  Template.guestBook.helpers({
    'messages':function() {
      return Messages.find({}, {sort: {createdOn: -1}}) || {};
    }
  });

  Template.guestBook.events({
    'submit form':function(event) {
      event.preventDefault();

      var messageBox = $(event.target).find('textarea[name=guestBookMessage]');
      var messageText = messageBox.val();

      var nameBox = $(event.target).find('input[name=guestName]');
      var name = nameBox.val();

      var date = new Date(Date.now());
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      Messages.insert({message: messageText, name: name, createdOn: formattedTime});

      messageBox.val('');
      nameBox.val('');
    },

    'click .delete': function () {
      Messages.remove(this._id);
      }
    });
  } 

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("messages1", function () {
    return Messages.find();
  });
}
