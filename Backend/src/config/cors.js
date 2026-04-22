const normalizeAllowedOrigins = (value = '') =>
  String(value || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

const escapeRegex = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const wildcardToRegex = (pattern = '') => {
  const segments = String(pattern).split('*').map(escapeRegex);
  return new RegExp(`^${segments.join('.*')}$`);
};

const matchesAllowedOrigin = (allowedOrigin = '', requestOrigin = '') => {
  if (!allowedOrigin || allowedOrigin === '*') {
    return true;
  }

  if (allowedOrigin === requestOrigin) {
    return true;
  }

  if (allowedOrigin.includes('*')) {
    return wildcardToRegex(allowedOrigin).test(requestOrigin);
  }

  return false;
};

export const createCorsOriginResolver = (corsOriginValue = '*') => {
  const allowedOrigins = normalizeAllowedOrigins(corsOriginValue);

  return (requestOrigin, callback) => {
    if (!requestOrigin) {
      callback(null, true);
      return;
    }

    if (
      allowedOrigins.length === 0 ||
      allowedOrigins.some((allowedOrigin) => matchesAllowedOrigin(allowedOrigin, requestOrigin))
    ) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${requestOrigin} is not allowed by CORS`));
  };
};

export const createCorsOptions = (corsOriginValue = '*') => ({
  origin: createCorsOriginResolver(corsOriginValue),
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 204,
});
