import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { feedbackKeys } from '../resume/feedback/feedbackKeys.const';
import { patchFeedbackComment } from '~/api/resume/feedback/patchFeedbackComment';
import CONSTANTS from '~/constants';
import { ResumeMeErrorResponse } from '~/types/errorResponse';

const usePatchFeedbackComment = (resumeId: string, eventId: string) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const TARGET_QUERY_KEY = feedbackKeys.resumeFeedbacks(resumeId, eventId);

  return useMutation({
    mutationFn: patchFeedbackComment,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: TARGET_QUERY_KEY, type: 'active' });
      toast({
        description: '성공적으로 수정되었습니다 :)',
        status: 'success',
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

export default usePatchFeedbackComment;