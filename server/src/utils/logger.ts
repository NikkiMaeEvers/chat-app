import pino from 'pino'; // Logger
import dayjs from 'dayjs'; // Date library for browsers

const log = pino({
  transport: {
    target: 'pino-pretty'
  },
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

 export default log;