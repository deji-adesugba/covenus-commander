import { ExceptionsHandler } from '../../exceptions/exceptions-handler';
import { Metatype } from '../../../common';
import { Command, Argument, Option } from '../../../common/interfaces';

export interface ExceptionsTrap {
    create(instance: Metatype<Command | Argument | Option>): ExceptionsHandler;
}
