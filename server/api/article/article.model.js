import mongoose from 'mongoose';
import {registerEvents} from './article.events';

var ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Categorie'
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

registerEvents(ArticleSchema);
export default mongoose.model('Article', ArticleSchema);
