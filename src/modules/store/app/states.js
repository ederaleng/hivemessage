import LS from '@/helpers/storage'

let lsUserActive = LS.getItem('userActive')
// let lsTimeActive = LS.getItem('timeActive')

let userActive = null
if (lsUserActive) {
  userActive = lsUserActive
}

export default {
  username: userActive,
  userType: null
};
