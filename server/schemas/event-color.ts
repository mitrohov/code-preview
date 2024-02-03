import {object, string, number, setLocale} from 'yup';

setLocale({
  mixed: {
    required: 'Обязательное поле',
  },
});

export const color = {
  id: number().required().positive().integer(),
  title: string().required(),
  code: string().required()
}

export const GetEventColorSchema = object(color);
