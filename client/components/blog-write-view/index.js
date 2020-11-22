import React from 'react'

import styles from './blog-write-view.module.css'

const BlogWriteView = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.topForm}>
          <h1>Write a public blog</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default BlogWriteView
