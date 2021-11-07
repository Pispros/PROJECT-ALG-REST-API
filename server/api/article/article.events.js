/**
 * Article model events
 */

import {EventEmitter} from 'events';
var ArticleEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ArticleEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Article) {
  for(var e in events) {
    let event = events[e];
    Article.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ArticleEvents.emit(event + ':' + doc._id, doc);
    ArticleEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ArticleEvents;
