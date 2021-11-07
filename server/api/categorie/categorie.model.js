import mongoose from 'mongoose';
import {registerEvents} from './categorie.events';

var CategorieSchema = new mongoose.Schema({
  title: String,
  description: String,
  listArticles:[],
  isActive: {
    type: Boolean,
    default: true
  }
});

registerEvents(CategorieSchema);
export default mongoose.model('Categorie', CategorieSchema);
