import React from 'react'
import classNames from 'classnames'
import styles from '../../styles/PrimaryTextInput.module.scss'

const PrimaryTextInput = (props) => {
  return (
    <input maxLength={5000} style={{width: props.width, height: props.height, fontSize: props.fontSize, paddingLeft: props.paddingleft}} className={classNames('custom-text', styles.customText)} type='text' {...props} required/>
  )
}

export default PrimaryTextInput