import RoomCard from '@/component/RoomCard';
import React from 'react';

const AllRooms = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/room`)
    const rooms = await res.json()
    console.log(rooms);
    
    return (
        <div className='container mx-auto py-10 font-fauna'>
            <h2 className='text-3xl font-bold text-center font-cinzel'>All rooms are here</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                {
                    rooms.map(room => <RoomCard key={room._id} room={room}/>)
                }
            </div>
        </div>
    );
};

export default AllRooms;