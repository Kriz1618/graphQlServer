import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  detail: String,
  date: Date,
}, { timestamps: true });

const Todo = mongoose.model('todo', todoSchema);

export default Todo;