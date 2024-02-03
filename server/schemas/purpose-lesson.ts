import {object, string, number, setLocale} from 'yup';

setLocale({
  mixed: {
    required: 'Обязательное поле',
  },
});

export const purposeLesson = {
  title: string().required()
}

export const PostPurposeLessonSchema = object(purposeLesson);
export const PatchPurposeLessonSchema = object({
  id: number().required().positive().integer(),
  ...purposeLesson
});
export const GetPurposeLessonSchema = object({
  id: number().required().positive().integer(),
  ...purposeLesson
});
