const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'aa1092547508',
        mongodb_password: 'x9oMZcQU7rmn6npI',
        mongodb_clustername: 'cluster0',
        
      },
    };
  }

  return {
    env: {
      mongodb_username: 'aa1092547508',
      mongodb_password: 'x9oMZcQU7rmn6npI',
      mongodb_clustername: 'cluster0',
    },
  };
};

