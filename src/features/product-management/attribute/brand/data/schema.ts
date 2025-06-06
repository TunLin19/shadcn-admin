import { z } from 'zod'

export const brandSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, 'Tên là bắt buộc')
    .max(255, 'Tên không được quá 255 ký tự')
    .trim()
    .refine((value) => value.length > 0, {
      message: 'Không được nhập chỉ khoảng trắng',
    }),
    imageUrl: z.string().url('URL không hợp lệ').optional(),
  status: z.string().min(1, 'Status is required'),
})

export type Brand = z.infer<typeof brandSchema>
