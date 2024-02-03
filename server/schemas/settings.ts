import {object, number, setLocale} from 'yup';

setLocale({
  mixed: {
    required: 'Обязательное поле',
  },
});

export const settings = {
  standard_hours_per_month: number().required().positive().integer()
}

export const PostSettingsSchema = object(settings);
export const PatchSettingsSchema = object({
  id: number().required().positive().integer(),
  ...settings
});
export const GetSettingsSchema = object({
  id: number().required().positive().integer(),
  ...settings
});
