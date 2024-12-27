

export const getEvents = async() => {
    const res = await fetch(`https://ate-backend.vercel.app/api/events`
    ,{next: {revalidate:0}}
    )
    const data = await res.json()
    console.log(data)
    return data.events
}

    export const getEventSlug = async(slug: string) => {
        const res = await fetch (`https://ate-backend.vercel.app/api/events/${slug}`
        ,{next: {revalidate:0}}
        )
        const data = await res.json()
        return data.event
    }