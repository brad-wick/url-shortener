import prisma from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

interface RedirectPageProps {
    params: {
        shorturl: string
    }
}

export default async function RedirectPage({ params }: RedirectPageProps) {
    const { shorturl } = params

    const url = await prisma.url.findUnique({
        where: { shortUrl: shorturl }
    })

    if (!url) {
        return <div>404 URL not found</div>
    }

    await prisma.url.update({
        where: { id: url.id },
        data: { visits: { increment: 1 } }
    })

    redirect(url.originalUrl)
}
