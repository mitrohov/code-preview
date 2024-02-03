import {object, string, number, setLocale} from 'yup';

setLocale({
  mixed: {
    required: 'Обязательное поле',
  },
});

export const schedule = {
  student_id: number().required().positive().integer(),
  day_week: number().required().positive().integer(),
  time: string().required()
}

export const PostScheduleSchema = object(schedule);
export const PatchScheduleSchema = object({
  id: number().required().positive().integer(),
  ...schedule
});
export const GetScheduleSchema = object({
  id: number().required().positive().integer(),
  ...schedule
});
