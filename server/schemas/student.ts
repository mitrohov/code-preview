import {object, string, number, array, setLocale} from 'yup';

setLocale({
  mixed: {
    required: 'Обязательное поле',
  },
});

export const student = {
  fio: string().required(),
  qty_lessons_per_month: number().required().positive().integer(),
  qty_lessons_per_week: number().required().positive().integer(),
  lesson_cost: number().required().positive().integer(),
  description: string(),
  lesson_time: number().required().positive().integer(),
  day_month_of_payment: number().required().positive().integer(),
  english_level_id: number().required().positive().integer(),
  purpose_lesson_id: number().required().positive().integer(),
  phone: string(),
  social: string(),
}

export const PostStudentSchema = object(student);
export const PatchStudentSchema = object({
  id: number().required().positive().integer(),
  ...student
});
export const GetEventSchema = object({
  id: number().required().positive().integer(),
  payment_amount_per_month: number().required().positive().integer(),
  schedules: array().of(
    object({
      id: number().required().positive().integer(),
      student_id: number().required().positive().integer(),
      day_week: number().required().positive().integer(),
      time: string().required()
    })
  ),
  english_level_title: string().required(),
  ...student
});
