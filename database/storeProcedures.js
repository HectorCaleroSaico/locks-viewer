require('dotenv').config()

module.exports = {
    sp_get_locks: process.env.SP_GET_LOCKS,
    sp_kill_locks: process.env.SP_kILL_LOCKS,
    sp_get_report_locks: process.env.SP_GET_REPORT_LOCKS,
    sp_sign_in_users: process.env.SP_SIGNIN_USERS
}