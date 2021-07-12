import { Document } from 'mongoose';

import { Conversation } from '../../interfaces';

export type ConversationDocument = Conversation & Document;
