import React from 'react'
import classNames from 'classnames'
import styles from '../../styles/PrimaryTextInput.module.scss'

const PrimaryTextInput = (props) => {
  return (
    <input className={classNames('custom-text', styles.customText)} type='text' {...props} required/>
  )
}

export default PrimaryTextInput