import React, { useContext } from 'react'
import cn from 'classnames'

import { AuthContext } from '../../store/auth'

import Button from '../button'

import styles from './page-title.module.css'

const PageTitle = ({ title, button, borderBottom = true, children }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className={cn(styles.container, borderBottom && styles.borderBottom)}>
      <div className={styles.title}>
        <h1>{title}</h1>
        <div className={styles.buttonContainer}>
          {button && (
            <>
            <Button
              href={isAuthenticated() ? '/questions/ask' : '/auth'}
              primary
              className={styles.button}
            >
              Ask Question
            </Button>

            <Button
              href={isAuthenticated() ? '/blogs/write' : '/auth'}
              primary
              className={styles.button}
            >
            Write a Blog
            </Button>
            </>
          )}
        </div>
      </div>
      {children && <p className={styles.summary}>{children}</p>}
      
    </div>
  )
}

export default PageTitle
