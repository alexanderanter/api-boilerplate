import { Context } from 'koa';

export const upload = async (ctx: Context, next: Function) => {
  const { API_URL } = ctx.constants.CONFIG;
  try {
    const { file } = ctx.request.body.files;
    ctx.body = {
      message: `Successfully uploaded file to ${API_URL}/${file.path}`,
    };
  } catch (error) {
    const { BadRequest } = ctx.errors.ClientErrors;
    const { InternalServerError } = ctx.errors.ServerErrors;
    if (
      error.message ===
      `Cannot destructure property \`file\` of 'undefined' or 'null'.`
    ) {
      ctx.throw(new BadRequest());
    } else if (error.message === `Cannot read property 'path' of undefined`) {
      ctx.throw(new BadRequest());
    } else {
      ctx.throw(new InternalServerError());
    }
  }
};

export const sendFile = async (ctx: Context) => {
  const { send } = ctx;
  await send(ctx, ctx.path);
};

export default {
  upload,
  sendFile,
};
