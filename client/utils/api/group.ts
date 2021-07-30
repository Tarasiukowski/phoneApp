import { fetcher } from '../fetcher';
import { Group } from 'interfaces';

export const removeGroup = (name: string) => fetcher('DELETE', '/group/remove', { name });

export const createGroup = (group: Group) => fetcher('POST', '/group/create', { ...group });
