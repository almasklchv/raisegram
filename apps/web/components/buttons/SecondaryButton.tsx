import React from 'react'
import classNames from 'classnames'
import styles from '../../styles/SecondaryButton.module.scss'

const SecondaryButton = (props) => {
  return (
    <button  {...props} className={classNames('btn', styles.btn)}></button>
  )
}

export default SecondaryButton