import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { messageServices } from './message.service';

const sendMessage = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await messageServices.sendMessage(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Message sent successfully',
    data: result,
  });
});

// only admin can get all messages
const getAllMessages = catchAsync(async (req, res) => {
  const result = await messageServices.getAllMessages(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All messages fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});

//delete single message
const deleteMessage = catchAsync(async (req, res) => {
  const id = req.params.id;

  await messageServices.deleteMessage(id);
  // Send response without data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Message deleted successfully',
  });
});

export const messageControllers = {
  sendMessage,
  getAllMessages,
  deleteMessage,
};
