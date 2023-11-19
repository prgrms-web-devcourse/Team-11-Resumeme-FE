import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import postEventApply from '~/api/event/postEventApply';
import CONSTANTS from '~/constants';
import { ResumeMeErrorResponse } from '~/types/errorResponse';

const usePostEventApply = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: postEventApply,
    onSuccess: () => {
      toast({
        description: '이벤트 신청에 성공했습니다.',
      });
    },
    /**TODO - queryClient에 공통 에러 처리 (onError) 설정해주기 */
    onError: (error) => {
      if (isAxiosError<ResumeMeErrorResponse>(error)) {
        if (error.response) {
          const errorCode = error.response.data.code;
          toast({
            description: CONSTANTS.ERROR_MESSAGES[errorCode],
            status: 'error',
          });
        }
      }
    },
  });
};

export default usePostEventApply;