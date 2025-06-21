import { z } from 'zod';

export const formSchema = z.object({
  catagory_type: z.string().min(1, 'Category Type is required'),
  job_catagory: z.string().min(1, 'Job Category is required'),
  industry_type: z.string().min(1, 'Industry Type is required'),
  job_industry: z.string().min(1, 'Job Industry is required'),

  apply_before: z.string().min(1, 'Apply Before is required'), // Or use z.date() if you’re using Date Picker

  job_title: z.string().min(1, 'Job Title is required'),
  no_of_vacancy: z
    .string()
    .refine(val => !Number.isNaN(Number(val)), { message: 'Must be a number' }),

  job_type: z.string().min(1, 'Job Type is required'),
  service_type: z.string().min(1, 'Service Type is required'),
  job_level: z.string().min(1, 'Job Level is required'),
  job_location: z.string().min(1, 'Job Location is required'),

  skills: z.array(z.string()).min(1, 'At least one skill is required'),

  edu_preferences: z.string().min(1, 'Education Preference is required'),
  degree_name: z.string().min(1, 'Degree Name is required'),

  job_purpose: z.string().min(10, 'Job Purpose must be at least 10 characters'),

  salary: z.string().min(1, 'Salary selection is required'),
  exp_required: z.string().min(1, 'Experience selection is required'),
  is_driving_license: z.string().min(1, 'Driving License option is required'),
  gender: z.string().min(1, 'Gender selection is required'),
  is_online: z.string().min(1, 'Apply Online selection is required'),
  is_direct: z.string().min(1, 'Apply Direct selection is required'),
  is_apply_instruction: z.string().min(1, 'Apply Instruction selection is required'),

  education_qual_desc: z.string().optional(),
  job_desc: z.string().optional(),
  job_spec: z.string().optional(),
  job_benifit: z.string().optional(),
});

export type JobPostFormSchema = z.infer<typeof formSchema>;
