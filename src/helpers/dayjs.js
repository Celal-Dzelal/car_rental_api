const dayjs = require("dayjs");
require("dayjs/locale/tr");
const customParseFormat = require("dayjs/plugin/customParseFormat");

dayjs.extend(customParseFormat);
dayjs.locale("en");

module.exports = dayjs;
