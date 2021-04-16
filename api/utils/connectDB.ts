import * as mongoose from 'mongoose';

export const connectDB = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/main', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  });
};
