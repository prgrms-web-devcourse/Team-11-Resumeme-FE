import { isAxiosError } from 'axios';
import { resumeMeAxios } from '~/api/axios';
import CONSTANTS from '~/constants';
import { ResumeMeErrorResponse } from '~/types/errorResponse';
import { ReadTraining } from '~/types/training';
import { getCookie } from '~/utils/cookie';

export type GetResumeTraining = { resumeId: string };

export const getResumeTraining = async ({
  resumeId,
}: GetResumeTraining): Promise<ReadTraining[]> => {
  const accessToken = getCookie(CONSTANTS.ACCESS_TOKEN_HEADER);

  try {
    const { data } = await resumeMeAxios.get(`/v1/resumes/${resumeId}/trainings`, {
      headers: {
        /**FIXME - 쿠키 등에 별도 저장된 토큰 가져오기 */
        Authorization: accessToken,
      },
    });
    return data['trainings'] ?? [];
  } catch (e) {
    if (isAxiosError<ResumeMeErrorResponse>(e)) {
      throw new Error(e.response?.data.message);
    }
    return [];
  }
};
