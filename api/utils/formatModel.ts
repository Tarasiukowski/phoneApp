import { Document } from 'mongoose';

interface ObjectOfDocument {
  [key: string]: any;
}

export const formatModel = <T extends object>(document: Document<T>) => {
  const formatedDocument: ObjectOfDocument = {};
  const objectOfDocument: ObjectOfDocument = document.toObject();

  for (const key in objectOfDocument) {
    const formatedKey = key.replace(/[^a-zA-Z0-9]/g, '');
    const value = objectOfDocument[key];

    formatedDocument[formatedKey] = value;
  }

  return formatedDocument;
};
