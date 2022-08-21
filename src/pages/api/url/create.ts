import { NextApiRequest, NextApiResponse } from 'next';
import { ShortLink } from '@prisma/client';
import { z } from 'zod';

import { prisma } from '../../../db/client';

const bodySchema = z.object({
  slug: z.string(),
  url: z.string().url()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShortLink | { error: string }>
) {
  const body = bodySchema.safeParse(JSON.parse(req.body));

  if (!body.success) {
    res.status(400).json({ error: body.error.issues?.[0].message });
    return;
  }

  const exists = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: body.data.slug
      }
    }
  });

  if (exists !== null) {
    return res.status(403).json({ error: 'This slug is already used' });
  }

  const data = await prisma.shortLink.create({
    data: {
      slug: body.data.slug,
      url: body.data.url
    }
  });

  return res.json(data);
}
