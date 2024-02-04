import {
  ArrayMinSize,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

import { PollType } from '../entities/poll.entity';
import { ValidationError } from '../../common/enums/validation-error';

export class CreatePollDto {
  @IsNotEmpty({ message: ValidationError.TitleRequired })
  @IsString({ message: ValidationError.TitleInvalid })
  @MaxLength(255, { message: ValidationError.TitleMaxLength })
  title: string;

  @IsNotEmpty({ message: ValidationError.TypeRequired })
  @IsEnum(PollType, { message: ValidationError.TypeInvalid })
  type: PollType;

  @ArrayMinSize(2, { message: ValidationError.OptionsMinSize2 })
  @IsNotEmpty({ each: true, message: ValidationError.OptionsOptionRequired })
  @IsString({ each: true, message: ValidationError.OptionsOptionInvalid })
  @MaxLength(255, {
    each: true,
    message: ValidationError.OptionsOptionMaxLength,
  })
  options: string[];
}
