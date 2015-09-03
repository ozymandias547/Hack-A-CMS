/**
 * Unit testing tasks.
 */

'use strict';

var paths = require('../config/paths');

module.exports = {
	karma: {
		unit: {
			configFile: paths.configFiles.karma
		}
	}
};
