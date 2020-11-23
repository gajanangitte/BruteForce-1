import React from 'react'
import { useRouter } from 'next/router'

import NavItem from './nav-item'
import { World } from '../icons'
import { Blog } from '../icons'
import { Tag } from '../icons'
import { User } from '../icons'

import styles from './navigation.module.css'

const Navigation = () => {
  const router = useRouter()

  return (
    <nav className={styles.nav}>
      <NavItem
        href="/"
        selected={
          router.pathname == '/' || router.pathname.split('/')[1] == 'questions'
        }
      >
        <World />
        <span>Feed</span>
      </NavItem>

      <NavItem
        href="/blogs"
        selected={router.pathname == '/blogs'}
      >
        <Blog/>
        <span>Blogs</span>
      </NavItem>

      <NavItem href="/tags" selected={router.pathname == '/tags'}>
        <Tag/>
        <span>Tags</span>
      </NavItem>

      <NavItem
        href="/users"
        selected={router.pathname.split('/')[1] == 'users'}
      >
        <User/>
        <span>Users</span>
      </NavItem>

    </nav>
  )
}

export default Navigation
