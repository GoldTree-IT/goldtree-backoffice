import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

const uploader = async (url: string, payload: any) => {
  const { data } = await axiosInstance.post(url, payload);
  return data;
};

const putUploader = async (url: string, payload: any) => {
  const { data } = await axiosInstance.put(url, payload);
  return data;
};

export { putUploader, uploader };

export const usePostJobs = (id: string) => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader(`emp-post-job-info/?id=${id}`, payload);
        return data;
      } finally {
        setLocalLoading(false);
      }
    },
    onSuccess: () => {},
  });
  return {
    mutateAsync: query.mutateAsync,
    isPending: localLoading,
    isError: query.isError,
    error: query.error,
    data: query.data,
    isSuccess: query.isSuccess,
  };
};

export const useUpdatePostJobs = (id: string) => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await putUploader(`emp-posts-by-id/${id}`, payload);
        return data;
      } finally {
        setLocalLoading(false);
      }
    },
    onSuccess: () => {},
  });
  return {
    mutateAsync: query.mutateAsync,
    isPending: localLoading,
    isError: query.isError,
    error: query.error,
    data: query.data,
    isSuccess: query.isSuccess,
  };
};
