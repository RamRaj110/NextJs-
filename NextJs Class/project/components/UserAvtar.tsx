'use client'

import ROUTES from '@/constant/route'
import Link from 'next/link'
import React, { useState } from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import Image from 'next/image'

interface Props {
  id: string
  name: string
  imageUrl?: string | null
  className?: string
}

const UserAvatar = ({
  id,
  name,
  imageUrl,
  className = 'h-9 w-9 rounded-full',
}: Props) => {
  const [imgError, setImgError] = useState(false)

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={className}>
        {imageUrl && !imgError ? (
          <Image
            src={imageUrl}
            alt={name}
            width={40}
            height={40}
            className="rounded-full object-cover border border-border"
            onError={() => setImgError(true)}
          />
        ) : (
          <AvatarFallback>
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  )
}

export default UserAvatar
