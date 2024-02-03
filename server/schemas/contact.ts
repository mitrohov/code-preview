import { object, string, number, setLocale } from 'yup';

setLocale({
  mixed: {
    required: 'Обязательное поле',
  },
});

export const contactPostSpec = {
  fio: string().required(),
  mobile_number: string(),
  socials: string(),
  description: string(),
  order_platform_id: number().required().positive().integer()
}

export const PostContactSchema = object(contactPostSpec);
export const PatchContactSchema = object({
  id: number().required().positive().integer(),
  ...contactPostSpec
});
export const GetContactSchema = object({
  id: number().required().positive().integer(),
  order_platform_title: string().required(),
  ...contactPostSpec
});
