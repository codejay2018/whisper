import {formatTime} from '../lib/utils';

export function MessageBubble({message, currentUser}){
  const isMe = message.sender?._id === currentUser?._id;
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-md px-4 py-2.5 rounded-2xl 
        ${isMe ? ' text-primary-content bg-linear-to-r from-amber-500 to-amber-500' : 'bg-base-300/40 text-base-content'}
        `}>
        <p className='text-sm' >{message.text}</p>
        <p className={` text-xs mt-1 ${isMe ? ' text-primary-content/80' : ' text-base-content/70' } `} >{formatTime(message.createdAt)}</p>
      </div>
    </div>
  );
}