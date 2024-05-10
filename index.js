/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

exports.stripPrivateProperties = (bannedProperties = [], entries = []) => {
  if (!bannedProperties || bannedProperties.length < 1) {
    return entries;
  }
  console.log(entries);
  return entries.map((entry) => {
    bannedProperties.forEach((bannedProperty) => {
      delete entry[bannedProperty];
    });
    return entry;
  });
};
exports.excludeByProperty = (propertyToExclude, entries = []) => {
  if (!propertyToExclude) {
    return entries;
  }
  return entries.filter((entry) => {
    const propertyNames = new Set(Object.keys(entry));
    return !propertyNames.has(propertyToExclude);
  });
};

const sumEntryValues = (objects = []) => {
  let sum = 0;
  objects.forEach((o) => (sum += o.val));
  return sum;
};
exports.sumDeep = (entries = []) => {
  return entries.map((entry) => ({
    objects: sumEntryValues(entry.objects),
  }));
};

const statusHasColorMapping = (statusColorMapping = {}, status) => {
  return !!statusColorMapping[status];
};
exports.applyStatusColor = (colorStatusMapping = {}, statuses = []) => {
  const statusColorMapping = {};
  for (const color of Object.keys(colorStatusMapping)) {
    colorStatusMapping[color].forEach(
      (statusCode) => (statusColorMapping[statusCode] = color)
    );
  }
  return statuses
    .filter((statusEntry) =>
      statusHasColorMapping(statusColorMapping, statusEntry.status)
    )
    .map((statusEntry) =>
      Object.assign(statusEntry, {
        color: statusColorMapping[statusEntry.status],
      })
    );
};
exports.createGreeting = (greeter, greeting) => {
  return (personasName) => greeter(greeting, personasName);
};
exports.setDefaults = (defaultProperties = {}) => {
  return (objectToApplyDefaults = {}) => {
    const actualProperties = new Set(Object.keys(objectToApplyDefaults));
    for (const defaultPropertyName of Object.keys(defaultProperties)) {
      if (!actualProperties.has(defaultPropertyName)) {
        objectToApplyDefaults[defaultPropertyName] =
          defaultProperties[defaultPropertyName];
      }
    }
    return objectToApplyDefaults;
  };
};
exports.fetchUserByNameAndUsersCompany = async (name, services) => {
  try {
    const user = await services
      .fetchUsers()
      .then((users) => users.find((user) => user.name === name));
    if (!user) {
      throw new Error(`User with the name ${name} not found`);
    }
    const company = await services.fetchCompanyById(user.companyId);
    const status = await services.fetchStatus();
    return { company, status, user };
  } catch (err) {
    console.log(`Error fetching user ${err}`);
  }
};
