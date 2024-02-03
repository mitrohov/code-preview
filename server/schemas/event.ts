import {object, string, number, boolean, setLocale} from 'yup';

setLocale({
  mixed: {
    required: 'Обязательное поле',
  },
});

export const event = {
  student_id: number().required().positive().integer(),
  event_category_id: number().required().positive().integer(),
  title: string().required(),
  has_home_work: boolean().required(),
  description: string(),
  start_time: string().required(),
  end_time: string().required(),
  payment_id: number().required().positive().integer(),
  is_lesson: boolean().required(),
  is_missed: boolean().required(),
}

export const PostEventSchema = object(event);
export const PatchEventSchema = object({
  id: number().required().positive().integer(),
  ...event
});
export const GetEventSchema = object({
  id: number().required().positive().integer(),
  event_category_title: string().required(),
  student_fio: string().required(),
  color_code: string().required(),
  payment_date: string().required(),
  payment_title: string().required(),
  payment_is_not_pay: boolean().required(),
  qty_lessons_left: string().required(),
  ...event
});
