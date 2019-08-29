import config from '../configuration/config';

function canLog(forceForTesting: boolean): boolean {
  return (config.isDev && !config.isTest) || (config.isTest && forceForTesting);
}

const Logger = {
  log: (message: string, context?: any, forceForTesting: boolean = false) => {
    if (canLog(forceForTesting)) {
      console.log(message, context);
    }
  },
  error: (message: string, context?: any, forceForTesting: boolean = false) => {
    if (canLog(forceForTesting)) {
      console.warn(message, context);
    }
  },
};

export default Logger;
