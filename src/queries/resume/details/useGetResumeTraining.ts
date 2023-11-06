import { useQuery } from '@tanstack/react-query';
import { GetResumeTraining, getResumeTraining } from '~/api/resume/details/getResumeTraining';

export const useGetResumeTraining = ({ resumeId }: GetResumeTraining) => {
  return useQuery({
    queryKey: ['getResumeCareer'],
    queryFn: () => getResumeTraining({ resumeId }),
    enabled: !!resumeId,
  });
};