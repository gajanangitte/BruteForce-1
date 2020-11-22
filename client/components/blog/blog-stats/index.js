import React from 'react'

import styles from './question-stats.module.css'

const BlogStats = ({ voteCount, answerCount, view }) => {
  return (
    <div className={styles.container}>
      <div className={styles.vote}>
        <span>{voteCount}</span>
        <p>votes</p>
      </div>
      <div className={styles.answer}>
        <span>{answerCount}</span>
        <p>comments</p>
      </div>
      <p className={styles.view}>{view} views</p>
    </div>
  )
}

export default BlogStats
