const upload = async (ctx, next) => {
  const { API_URL } = ctx.constants.CONFIG;
  const { file } = ctx.request.body.files;
  ctx.body = {
    message: `Successfully uploaded file to ${API_URL}/${file.path}`,
  };
};

const sendFile = async ctx => {
  const { send } = ctx;
  await send(ctx, ctx.path);
};

module.exports = {
  upload,
  sendFile,
};
