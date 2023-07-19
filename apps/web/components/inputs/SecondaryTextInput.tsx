import React from 'react'
import classNames from 'classnames'
import styles from '../../styles/SecondaryTextInput.module.scss'

const SecondaryTextInput = (props) => {
  return (
    <input className={classNames('custom-text', styles.customText)} type='text' {...props} required/>
  )
}

export default SecondaryTextInput