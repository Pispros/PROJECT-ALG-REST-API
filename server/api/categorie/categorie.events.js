/**
 * Categorie model events
 */

import {EventEmitter} from 'events';
var CategorieEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CategorieEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Categorie) {
  for(var e in events) {
    let event = events[e];
    Categorie.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    CategorieEvents.emit(event + ':' + doc._id, doc);
    CategorieEvents.emit(event, doc);
  };
}

export {registerEvents};
export default CategorieEvents;
