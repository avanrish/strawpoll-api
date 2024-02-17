import {
  ArrayMinSize,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

import { PollType } from '../entities/poll.entity';
import { ValidationError } from '../../common/enums/validation-error';
import { Transform } from 'class-transformer';

export class CreatePollDto {
  @IsNotEmpty({ message: ValidationError.TitleRequired })
  @IsString({ message: ValidationError.TitleInvalid })
  @MaxLength(255, { message: ValidationError.TitleMaxLength })
  @Transform(({ value }) => value.trim())
  title: string;

  @IsNotEmpty({ message: ValidationError.TypeRequired })
  @IsEnum(PollType, { message: ValidationError.TypeInvalid })
  type: PollType;

  @ArrayMinSize(1, { message: ValidationError.OptionsOptionRequired })
  @IsNotEmpty({ each: true, message: ValidationError.OptionsOptionRequired })
  @IsString({ each: true, message: ValidationError.OptionsOptionInvalid })
  @Transform(({ value }) =>
    value?.map((v: string) => v.trim())?.filter(Boolean),
  )
  @MaxLength(255, {
    each: true,
    message: ValidationError.OptionsOptionMaxLength,
  })
  options: string[];
}
