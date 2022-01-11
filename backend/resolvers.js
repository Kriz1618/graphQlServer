import Todo from './modules/Todo';

const resolvers = {
  Query: {
    welcome: () => {
      return "Welcome to graphQl server";
    },
    getTodos: async () => {
      const todos = await Todo.find();
      return todos;
    },
    getTodo: async (root, args) => {
      const todos = await Todo.findById(args.id);
      return todos;
    }
  },
  Mutation: {
    addTodo: async (root, args) => {
      const { title, detail, date } = args;
      const newTodo = new Todo({ title, detail, date });
      await newTodo.save();
      return newTodo;
    },
    deleteTodo: async (root, args) => {
      await Todo.findByIdAndDelete(args.id);
      return 'Todo was deleted successfully';
    },
    updateTodo: async (root, args) => {
      const { id, title, detail, date } = args;
      const updatedTodo = {};
      title && (updatedTodo.title = title);
      detail && (updatedTodo.detail = detail);
      date && (updatedTodo.date = date);

      const todo = await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });

      return todo;
    }
  }
};

export default resolvers;
