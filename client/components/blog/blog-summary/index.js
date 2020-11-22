import React from 'react'
import Link from 'next/link'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import slug from 'slug'

import Tag from '../../tag'

import styles from './blog-summary.module.css'

const BlogSummary = ({
  id,
  title,
  tags,
  author,
  createdTime,
  children
}) => {
  return (
    <div className={styles.container}>
      <Link href="/blogs/[slug]" as={`/blogs/${id}-${slug(title)}`}>
        <a className={styles.link}>{title}</a>
      </Link>

      <div className={styles.excerpt}>{children}</div>
      <div className={styles.footer}>
        <div className={styles.tagContainer}>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className={styles.userDetails}>
          <div className={styles.info}>
            <span>
              written{' '}
              {formatDistanceToNowStrict(new Date(createdTime), {
                addSuffix: true
              })}
              {' '}by{' '} 
              <Link href="/users/[user]" as={`/users/${author.username}`}>
              <a>{author.username}</a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSummary
