const getQueryOptions = query => {
  const page = query.page * 1 || 1;
  const limit = query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  const sort = {};
  if (query.sortBy) {
    const parts = query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  return { limit, skip, sort };
};

const errorJson = (code, message) => ({
  error: {
    code,
    message,
  },
});

const expectedDesiredParameters = [
  'DeviceVariant',
  'DryRunDetectedTime',
  'DailyAverageUsage',
  'DeviceNoConnectionLockHours',
  'LVD24VCount',
  'LockStatus',
  'Latitude',
  'Longitude',
];

module.exports = {
  getQueryOptions,
  errorJson,
  expectedDesiredParameters,
};
