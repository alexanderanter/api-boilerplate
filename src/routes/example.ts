import * as Router from 'koa-router';
import * as file from '../controllers/file';

const koaBody = require('koa-body');

export = (router: Router) => {
  const { STATIC_FOLDER, UPLOADS_FOLDER } = app.context.constants.CONFIG;
  /**
   * @api {post} /example/files Upload file to API
   * @apiName ExampleFileUpload
   * @apiGroup Examples
   *
   * @apiSuccess {String} Success message
   *
   * @apiSuccessExample {JSON} Success-Response:
   * {
   *   "message": "Successfully uploaded file to API. The file can be accessed at <link/to/file>"
   * }
   *
   */
  router.post(
    '/example/upload',
    koaBody({
      formidable: {
        uploadDir: `${STATIC_FOLDER}/${UPLOADS_FOLDER}`,
        keepExtensions: true,
      },
      multipart: true,
      urlencoded: true,
    }),
    file.upload,
  );

  /**
   * @api {get} /public/uploads/:fileName Get the file
   * @apiName ExampleFileServe
   * @apiGroup Examples
   *
   * @apiSuccess {File} Serves the file
   *
   */
  router.get('/public/uploads/:fileName', file.sendFile);
};
