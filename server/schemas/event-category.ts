import {object, string, number, boolean, setLocale} from 'yup';

setLocale({
  mixed: {
    required: 'Обязательное поле',
  },
});

export const eventCategory = {
  title: string().required(),
  color_id: number().required().positive().integer(),
}

export const PostEventCategorySchema = object(eventCategory);
export const PatchEventCategorySchema = object({
  id: number().required().positive().integer(),
  ...eventCategory
});
export const GetEventCategorySchema = object({
  id: number().required().positive().integer(),
  color_title: string().required(),
  color_code: string().required(),
  for_lesson: boolean().required(),
  ...eventCategory
});
