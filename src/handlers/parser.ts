export const parseMessage = (
    message: Buffer,
    format: 'json' | 'string' | 'binary',
    binaryCallback?: (message: Buffer) => any
  ): any => {
    switch (format) {
      case 'json':
        return parseJson(message);
      case 'string':
        return message.toString();
      case 'binary':
        if (!binaryCallback) {
          throw new Error('Binary message format requires a callback function');
        }
        return binaryCallback(message);
      default:
        throw new Error('Unsupported message format');
    }
  };
  
  const parseJson = (message: Buffer): any => {
    try {
      return JSON.parse(message.toString());
    } catch (e) {
      throw new Error('Invalid JSON message');
    }
  };
  