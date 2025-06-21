'use client';

import type { SerializedEditorState } from 'lexical';

import { Form, useForm } from '@/components/forms';
import Input from '@/components/forms/Input';
import RadioGroup from '@/components/forms/RadioGroup';

import Select from '@/components/forms/Select';
import TextArea from '@/components/forms/Textarea';
import RootEditor from '@/components/root-editor';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  applyDirectOptions,
  applyInstruction,
  applyOnlineOptions,
  categoryType,
  degreeName,
  eduPreferences,
  expOptions,
  genderOptions,
  industryType,
  jobCategory,
  jobIndustry,
  jobLevel,
  jobTypeOptions,
  licenseOptions,
  salaryOptions,
  serviceType,
  skillsArr,
} from '../moderation.constant';
import { formSchema } from '../moderation.schema';
import { usePostJobs, useUpdatePostJobs } from '../services/use-jobs';

const emptyState: SerializedEditorState = {
  root: {
    children: [],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
};

export default function JobPostForm() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const isNew = pathname === '/employee/dashboard/new-job';

  const form = useForm({
    schema: formSchema,
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { mutateAsync: postJob } = usePostJobs('test');
  const { mutateAsync: updateJob } = useUpdatePostJobs((params?.id as string) || '');

  // Lexical editor states
  const [eQD, setEQD] = useState<SerializedEditorState>(emptyState); // Education Qual Desc
  const [jD, setJD] = useState<SerializedEditorState>(emptyState); // Job Desc
  const [jS, setJS] = useState<SerializedEditorState>(emptyState); // Job Spec
  const [jB, setJB] = useState<SerializedEditorState>(emptyState); // Job Benefits

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        education_qual_desc: eQD,
        job_desc: jD,
        job_spec: jS,
        job_benifit: jB,
      };

      await (isNew ? postJob(payload) : updateJob(payload));
      router.push('/employee/dashboard/jobs');
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="space-y-6 p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-semibold">Post a Job</h1>

        {/* FORM FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select label="Category Type" options={categoryType} {...form.register('catagory_type')} />
          <Select label="Job Category" options={jobCategory} {...form.register('job_catagory')} />
          <Select label="Industry Type" options={industryType} {...form.register('industry_type')} />
          <Select label="Job Industry" options={jobIndustry} {...form.register('job_industry')} />
          <Input label="Apply Before (in days)" {...form.register('apply_before')} />
          <Input label="Job Title" {...form.register('job_title')} />
          <Input label="No. of Vacancy" {...form.register('no_of_vacancy')} />
          <Select label="Job Type" options={serviceType} {...form.register('job_type')} />
          <Select label="Service Type" options={jobTypeOptions} {...form.register('service_type')} />
          <Select label="Job Level" options={jobLevel} {...form.register('job_level')} />
          <Input label="Job Location" {...form.register('job_location')} />
          <Select label="Skills" options={skillsArr} {...form.register('skills')} />
          <Select label="Educational Preferences" options={eduPreferences} {...form.register('edu_preferences')} />
          <Select label="Degree Name" options={degreeName} {...form.register('degree_name')} />
        </div>

        <TextArea label="Job Purpose" {...form.register('job_purpose')} rows={6} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RadioGroup label="Salary" options={salaryOptions} {...form.register('salary')} />
          <RadioGroup label="Experience Required" options={expOptions} {...form.register('exp_required')} />
          <RadioGroup label="Driving License" options={licenseOptions} {...form.register('is_driving_license')} />
          <RadioGroup label="Gender" options={genderOptions} {...form.register('gender')} />
          <RadioGroup label="Apply Online" options={applyOnlineOptions} {...form.register('is_online')} />
          <RadioGroup label="Apply Direct" options={applyDirectOptions} {...form.register('is_direct')} />
          <RadioGroup label="Apply Instruction" options={applyInstruction} {...form.register('is_apply_instruction')} />
        </div>

        <RootEditor
          label="Educational Qualification Description"
          value={eQD}
          onChangeAction={setEQD}
        />

        <RootEditor
          label="Job Description"
          value={jD}
          onChangeAction={setJD}
        />

        <RootEditor
          label="Job Specification"
          value={jS}
          onChangeAction={setJS}
        />

        <RootEditor
          label="Job Benefits"
          value={jB}
          onChangeAction={setJB}
        />
        <Button type="submit" className="bg-primary text-white w-full md:w-auto">
          {isNew ? 'Save Job' : 'Update Job'}
        </Button>
      </div>
    </Form>
  );
}
