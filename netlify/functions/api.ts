import serverless from 'serverless-http';
import { app } from '../../server';

const serverlessHandler = serverless(app);

export const handler = async (event: any, context: any) => {
  // Ensure Netlify event has an absolute URL so serverless-http does not throw 'TypeError: Invalid URL'
  const host = event.headers?.host || event.headers?.Host || 'srananflow.netlify.app';
  const proto = event.headers?.['x-forwarded-proto'] || 'https';

  if (!event.rawUrl || !event.rawUrl.startsWith('http')) {
    const requestPath = event.path || '/';
    event.rawUrl = `${proto}://${host}${requestPath}`;
  }

  if (!event.headers) {
    event.headers = {};
  }
  if (!event.headers.host) {
    event.headers.host = host;
  }

  return serverlessHandler(event, context);
};
