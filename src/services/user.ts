import { Context } from 'koa';

import User from '../models/User.js';

export const count = async (ctx: Context) => {
  const count = await User.count();
  return count;
};

export default {
  count,
};
