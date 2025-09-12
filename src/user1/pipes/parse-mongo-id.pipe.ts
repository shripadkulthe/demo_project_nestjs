import { PipeTransform, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';


export class ParseMongoIdPipe implements PipeTransform<string, string> {
transform(value: string) {
if (!Types.ObjectId.isValid(value)) {
throw new BadRequestException('Invalid MongoDB ObjectId');
}
return value;
}
}