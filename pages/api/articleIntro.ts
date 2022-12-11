import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CMSDOMAIN } from '@/utils';

export interface IArticleIntro {
  label: string;
  info: string;
  articleId: number;
}

interface IArticleIntroProps {
  list: Array<{ label: string; info: string; articleId: number }>;
  total: number;
}

const getArticleIntroData = (req: NextApiRequest, res: NextApiResponse<IArticleIntroProps>): void => {
  const { pageNo, pageSize } = req.body;
  axios
    .get(`${CMSDOMAIN}/api/article-introductions`, {
      params: {
        pageNo,
        pageSize,
      },
    })
    .then(result => {
      const { data, meta } = result.data || {};

      res.status(200).json({
        list: Object.values(data),
        total: meta.pagination.total,
      });
    });
};

export default getArticleIntroData;
