import { ArrayMinSize, IsInt } from 'class-validator';
import { ValidationError } from '../../common/enums/validation-error';
import { Transform } from 'class-transformer';

export class VoteDto {
  @ArrayMinSize(1, { message: ValidationError.OptionIdsRequired })
  @IsInt({ each: true, message: ValidationError.OptionIdsOnlyIntegers })
  @Transform(({ value }) => value.filter((v) => typeof v === 'number'))
  optionIds: number[];
}
