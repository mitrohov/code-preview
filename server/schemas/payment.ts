import {object, string, number, boolean, array, setLocale} from 'yup';

setLocale({
  mixed: {
    required: 'Обязательное поле',
  },
});

export const PaymentSpec = {
  title: string().required(),
  date: string().required(),
  sum: number().required().positive().integer(),
  lesson_qty: number().required().positive().integer(),
  student_id: number().required().positive().integer(),
}

export const PostPaymentSchema = object(PaymentSpec);
export const PatchPaymentSchema = object({
  id: number().required().positive().integer(),
  ...PaymentSpec
});
export const GetPaymentSchema = object({
  id: number().required().positive().integer(),
  student_lesson_cost: number().required().positive().integer(),
  events: array().of(
    object({
      id: number().required().positive().integer(),
      title: string().required(),
      end_time: string().required(),
      start_time: string().required(),
    })
  ),
  is_not_pay: boolean().required(),
  qty_lessons_left: string().required(),
  student_fio: string().required(),
  ...PaymentSpec
});
