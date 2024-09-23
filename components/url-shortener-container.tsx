"use client"

import React, { useState } from 'react'
import ShortenedForm from './shorten-form'
import UrlList from './url-list'

export default function UrlShortenerContainer() {
    const [refreshKey, setRefreshKey] = useState<number>(0)

    const handleUrlShortener = () => {
        setRefreshKey(refreshKey + 1)
    }

    return (
        <div className='space-y-4'>
            <ShortenedForm handleUrlShortener={handleUrlShortener} />
            <UrlList key={refreshKey} />
        </div>
    )
}
