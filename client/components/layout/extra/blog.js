import React, { useState, useEffect } from 'react'

import { Spinner } from '../../icons'

import styles from './extra.module.css'
import { publicFetch } from '../../../util/fetcher';
import BlogSummary from '../../blog/blog-summary';
import BlogWrapper from '../../blog/blog-wrapper';

const ExtraBlog = ({ marginTop = 24 }) => {
    
    const [blogState, setBlogState] = useState(null)

    useEffect(() => {
        const fetchPopularBlogs = async () => {
        const { data } = await publicFetch.get('/blog')
        setBlogState(data)
        }
        fetchPopularBlogs()
    }, [])

    const handleSorting = () => {
        switch ('Votes') {
          case 'Votes':
            return (a, b) => b.score - a.score
          case 'Views':
            return (a, b) => b.views - a.views
          case 'Newest':
            return (a, b) => new Date(b.created) - new Date(a.created)
          case 'Oldest':
            return (a, b) => new Date(a.created) - new Date(b.created)
          default:
            break
        }
      }

  return (
    
      <div
        className={styles.blogContainer}
        style={{ marginTop: `${marginTop}px` }}
     >
        <h2 style={{ marginTop: `12px` }}>Popular Blogs</h2>
        {!blogState && (
        <div className="loading">
            <Spinner />
        </div>
        )}

        <div className={styles.popularBlogs}>
            {blogState
            ?.slice(0, 3).sort(handleSorting())
            .map(
            ({
                id,
                title,
                text,
                tags,
                author,
                created
            }) => (
                <BlogWrapper key={id}>
                <BlogSummary
                    id={id}
                    title={title}
                    tags={tags}
                    author={author}
                    createdTime={created}
                >
                    {text}
                </BlogSummary>
                </BlogWrapper>
            )
            )}
        </div>
   
   
    </div>
    
  )
}

export default ExtraBlog
