import { isAxiosError } from 'axios';
import { resumeMeAxios } from '~/api/axios';
import CONSTANTS from '~/constants';
import { ResumeMeErrorResponse } from '~/types/errorResponse';
import { getCookie } from '~/utils/cookie';

type patchResumeTitle = { resumeId: string; resumeTitle: string };

export const patchResumeTitle = async ({ resumeId, resumeTitle }: patchResumeTitle) => {
  const accessToken = getCookie(CONSTANTS.ACCESS_TOKEN_HEADER);

  try {
    const { data } = await resumeMeAxios.patch(
      `v2/resumes/${resumeId}`,
      {
        title: resumeTitle,
      },
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );
    return data;
  } catch (e) {
    if (isAxiosError<ResumeMeErrorResponse>(e)) {
      throw new Error(e.response?.data.message);
    }
  }
};
