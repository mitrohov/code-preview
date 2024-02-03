import {object, string, number, setLocale} from 'yup';

setLocale({
  mixed: {
    required: 'Обязательное поле',
  },
});

export const orderPlatform = {
  title: string().required()
}

export const PostOrderPlatformSchema = object(orderPlatform);
export const PatchOrderPlatformSchema = object({
  id: number().required().positive().integer(),
  ...orderPlatform
});
export const GetOrderPlatformSchema = object({
  id: number().required().positive().integer(),
  ...orderPlatform
});
