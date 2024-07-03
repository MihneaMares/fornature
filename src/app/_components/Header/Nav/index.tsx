'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'
import { LogoutPage } from '../../../(pages)/logout/LogoutPage'
import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')



  const doLogout = async () => {
    await logout()
    setSuccess('Logged out successfully.')
    window.location.href = '/login'
  }

  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="none" />
      })}
      <Link href="/stories">Stories</Link> 
      {user && 
      <>
        <Link href="/write">Write</Link>
        <Link href="/account">Account</Link>
      </>
      }
      {!user && (
        <Button
          className={classes.logButton}
          el="link"
          href="/login"
          label="Login"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
      {user && (
        <>
          <CartLink />
          <Button 
            className={classes.logButton}
            el='link'
            href='/logout'
            label='Logout'
            appearance='primary'
            onClick={doLogout}
          />
        </>
      )}
    </nav>
  )
}