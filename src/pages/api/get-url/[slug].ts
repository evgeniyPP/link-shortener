import { NextApiRequest, NextApiResponse } from 'next';
import { ShortLink } from '@prisma/client';

import { prisma } from '../../../db/client';

export default async function getUrlBySlug(
  req: NextApiRequest,
  res: NextApiResponse<ShortLink | { error: string }>
) {
  const slug = req.query.slug;

  if (!slug || typeof slug !== 'string') {
    res.status(404).json({ error: 'The valid slug was not provided' });
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
    res.status(404).json({ error: 'The url was not found' });
    return;
  }

  return res.json(data);
}
