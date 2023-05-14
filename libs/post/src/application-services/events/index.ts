import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

export const POST_EVENTS_HANDLER: Type<IEventHandler>[] = [];
