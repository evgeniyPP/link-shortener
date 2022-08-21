import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../db/client';

const getUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug;

  if (!slug || typeof slug !== 'string') {
    res.statusCode = 404;
    res.json({ message: 'No slug was provided' });
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug
      }
    }
  });

  if (!data) {
    res.statusCode = 404;
    res.json({ message: 'The url was not found' });
    return;
  }

  return res.json(data);
};

export default getUrl;
