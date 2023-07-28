import React from 'react'
import classNames from 'classnames'
import styles from '../../styles/SecondaryTextInput.module.scss'

const SecondaryTextInput = (props) => {
  return (
    <input maxLength={5000} className={classNames('custom-text', styles.customText, props.classnameprop)} type='text' {...props} required/>
  )
}

export default SecondaryTextInput