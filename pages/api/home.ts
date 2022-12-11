import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CMSDOMAIN } from '@/utils';

interface IHomeProps {
  title: string;
  description: string;
}

const getHomeData = (req: NextApiRequest, res: NextApiResponse<IHomeProps>): void => {
  axios.get(`${CMSDOMAIN}/api/homes`).then(result => {
    const { title, description } = result.data || {};

    res.status(200).json({
      title,
      description,
    });
  });
};

export default getHomeData;
