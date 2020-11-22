import React, { useContext } from 'react'

<<<<<<< HEAD
import { TagContext } from '../../../store/tag'
=======
import { TagContext } from '../../../store/tag';
>>>>>>> master

import Tag from '../../tag'
import { Spinner } from '../../icons'

import styles from './extra.module.css'
<<<<<<< HEAD

const Extra = ({ marginTop = 24 }) => {
  const { tagState } = useContext(TagContext)
=======
import ExtraBlog from './blog';

const Extra = ({ marginTop = 24 }) => {
  const { tagState } = useContext(TagContext);
>>>>>>> master

  return (
    <div className={styles.container}>
      <div
        className={styles.tagContainer}
        style={{ marginTop: `${marginTop}px` }}
      >
        <h2>Popular Tags</h2>
        {!tagState && (
          <div className="loading">
            <Spinner />
          </div>
        )}
        <div className={styles.popularTags}>
          {tagState?.map((tag) => (
            <Tag key={tag._id} count={tag.count}>
              {tag._id}
            </Tag>
          ))}
        </div>
      </div>
<<<<<<< HEAD
=======

      <ExtraBlog />

>>>>>>> master
    </div>
  )
}

export default Extra
