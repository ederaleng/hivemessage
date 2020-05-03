/* eslint-disable */
import _get from 'lodash/get'

export default {
  setState: (state, pay) => {
    state.hasOwnProperty(_get(pay, 'key', 'NA'))
      ? (state[_get(pay, 'key', 'NA')] = _get(pay, 'value', null))
      : null
  }
}