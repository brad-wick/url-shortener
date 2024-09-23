"use client"

import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'

interface ShortenedFormProps {
    handleUrlShortener: () => void
}
export default function ShortenedForm({ handleUrlShortener }: ShortenedFormProps) {

    const [url, setUrl] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch(`/api/shorten`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            })
            await response.json()
            setUrl('')
            handleUrlShortener()
        } catch (error) {
            console.error("An error ocurred while shortening the URL: ", error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
                <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className='h-12'
                    type='url'
                    placeholder='Enter the URL you wan to shorten'
                    required />
                <Button className='w-full p-3' type='submit' disabled={isLoading}>
                    {isLoading ? 'Shortening...' : 'Shorten URL'}
                </Button>
            </div>
        </form>
    )
}
