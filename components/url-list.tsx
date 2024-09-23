"use client"

import { CheckIcon, CopyIcon, EyeIcon } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type Url = {
    id: string,
    shortUrl: string,
    originalUrl: string,
    visits: number
}

export default function UrlList() {

    const [urls, setUrls] = useState<Url[]>([])
    const [copied, setCopied] = useState<boolean>()
    const [copyUrl, setCopyUrl] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const shortenerUrl = (url: string) => `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`

    const fetchUrls = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/urls')
            const data = await response.json()
            setUrls(data)
        } catch (error) {
            console.error("Error getting the URLs", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(shortenerUrl(url)).then(() => {
            setCopied(true)
            setCopyUrl(url)
            setTimeout(() => {
                setCopied(false)
                setCopyUrl('')
            }, 1700)
        })
    }

    useEffect(() => {
        fetchUrls()
    }, [])

    if (isLoading) {
        return (
            <div className='animate-pulse'>
                <div className='h-8 bg-gray-200 rounded w-1/4 mb-4' />
                <ul className='space-y-2'>
                    {[1, 2, 3].map((num) => (
                        <li
                            key={num}
                            className='flex items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-4'
                        >
                            <div className='h-4 bg-gray-200 rounded w-1/2' />
                            <div className='flex items-center gap-3'>
                                <div className='h-5 w-5 bg-gray-200 rounded' />
                                <span className='flex items-center gap-3'>
                                    <div className='h-4 w-4 bg-gray-200 rounded' />
                                    <div className='h-4 w-10 bg-gray-200 rounded' />
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div className='space-y-4'>
            <h2 className='text-2xl font-bold mb-2'>URL History</h2>
            <ul className='space-y-2'>
                {urls && urls.map((url) => (
                    <li key={url.id} className='flex items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-3'>
                        <Link
                            href={`/${url.shortUrl}`}
                            className='text-blue-500'
                            target='_blank'>{shortenerUrl(url.shortUrl)}</Link>
                        <div className='flex items-center gap-3'>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='text-muted-foreground hover:bg-muted'
                                onClick={() => handleCopyUrl(url.shortUrl)}>
                                {
                                    copied && copyUrl === url.shortUrl ? <CheckIcon className='w-5 h-5' /> : <CopyIcon className='w-5 h-5' />
                                }
                                <span className='sr-only'>Copy URL</span>
                            </Button>
                            <span className='flex items-center gap-1 select-none'>
                                <EyeIcon />
                                {url.visits} visits
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
