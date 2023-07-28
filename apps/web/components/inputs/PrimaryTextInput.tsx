import React from 'react'
import classNames from 'classnames'
import styles from '../../styles/PrimaryTextInput.module.scss'

const PrimaryTextInput = (props) => {
  return (
    <input maxLength={5000} className={classNames('custom-text', styles.customText, props.classnameprop)} type='text' {...props} required/>
  )
}

export default PrimaryTextInput