import QueryBuilder from '../../builder/QueryBuilder';
import { IMessage } from './message.interface';
import { Message } from './message.model';

const sendMessage = async (payload: IMessage) => {
  const message = await Message.create(payload);
  return message;
};

const getAllMessages = async (query: Record<string, unknown>) => {
  const messagesQuery = new QueryBuilder(Message.find(), query)
    .search(['name', 'email', 'message'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const result = await messagesQuery.modelQuery;
  const meta = await messagesQuery.countTotal();
  return { result, meta };
};

// only admin can delete single message
const deleteMessage = async (id: string) => {
  const message = await Message.findById(id);

  if (!message) {
    throw new Error('Message not found');
  }

  const result = await Message.findOneAndDelete({ _id: id });
  return result;
};

export const messageServices = {
  sendMessage,
  getAllMessages,
  deleteMessage,
};
