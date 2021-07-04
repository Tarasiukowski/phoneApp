import { Document } from 'mongoose';

import { User } from '../../interfaces';

export type UserDocument = User & Document;
