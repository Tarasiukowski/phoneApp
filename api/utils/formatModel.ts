import { Document } from 'mongoose';

import { Conversation, User, UpdateOption } from '../interfaces';

export const formatModel = <U extends UpdateOption>(
  document: Document & (U extends UpdateOption.conversation ? Conversation : User),
) => {
  const objectOfDocument = document.toObject() as U extends UpdateOption.conversation
    ? Conversation
    : User;

  for (const key in objectOfDocument) {
    const formatedKey = key.replace(/[^a-zA-Z0-9]/g, '') as keyof typeof objectOfDocument;
    const value = objectOfDocument[key];

    objectOfDocument[formatedKey] = value;
  }

  return objectOfDocument;
};
