export enum ValidationError {
  TitleRequired = 'title.required',
  TitleInvalid = 'title.invalid',
  TitleMaxLength = 'title.maxLength',
  TypeRequired = 'type.required',
  TypeInvalid = 'type.invalid',
  OptionsOptionInvalid = 'options.option.invalid',
  OptionsOptionMaxLength = 'options.option.maxLength',
  OptionsOptionRequired = 'options.option.required',
  OptionIdsRequired = 'optionIds.required',
  OptionIdsOnlyIntegers = 'optionIds.onlyIntegers',
}
