import {object, string, number, setLocale} from 'yup';

setLocale({
  mixed: {
    required: 'Обязательное поле',
  },
});

export const englishLevel = {
  title: string().required()
}

export const PostEnglishLevelSchema = object(englishLevel);
export const PatchEnglishLevelSchema = object({
  id: number().required().positive().integer(),
  ...englishLevel
});
export const GetEnglishLevelSchema = object({
  id: number().required().positive().integer(),
  ...englishLevel
});
