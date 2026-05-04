import { SignInButton, SignUpButton } from '@clerk/react'
import { ArrowRightIcon, SparklesIcon } from 'lucide-react'

function HomePage() {
  return (
    <div className="h-screen bg-base-100 text-base flex" >
      {/* left side */}
      <div className='flex flex-1 flex-col p-8 lg:p-12 relative overflow-hidden'>
        {/* navbar */}
        <nav className='flex items-center justify-between relative z-10'>
          <div className='flex items-center gap-2.5'>
            <div className='size-9 rounded-xl bg-leaner-to-br from bg-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-grey-500/20' >
              <SparklesIcon className='size-5 text-primary-content' />
            </div>
            <span className='text-xl font-bold' >Whisper</span>
          </div>
          <div className='flex items-center gap-2'>
            <SignInButton mode='modal'>
              <button className='px-5 py-2.5 text-sm font-medium text-base-content/50 hover:text-base-content transition'>
                Sign in</button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <button className='bg-linear-to-r from-amber-500 to-orange-500 rounded-full hover:opacity-90 shadow-lg shadow-orange-500/25 border-none text-sm font-semibold btn gap-2 ' >
                Get Started
                <ArrowRightIcon className='w-4 h-4'/>
              </button>
            </SignUpButton>
          </div>
        </nav>
        {/* main content */}
        <div className='flex-1 flex flex-col justify-center max-w-xl relative z-10'>
          {/* tag */}
          <div className='mb-8'>
            <span className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider'>
              <span className='animate-pulse bg-amber-400 rounded-full w-1.5 h-1.5'/>
              Now Available
            </span>
          </div>
          {/* headline */}
          <h1 className='text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight font-mono'>
            Messaging for
            <br/>
            <span className='bg-linear-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent'>everyone</span>
          </h1>
          {/* description */}
          <p className='mt-6 text-lg text-base-content/70 leading-relaxed max-w-md'>
            Secure, blazing-fast conversations with real-time presence and instance delivery.
            Connect
            with anyone, anywhere.
          </p>
          {/* CTA BTNs */}
          <div className='mt-10 flex items-center gap-4'>
            <SignUpButton mode='modal'>
              <button className='group flex items-center gap-3 px-8 py-4 bg-base-100 text-base-content font-semibold rounded-2xl hover:bg-base-200 transition'>
                Start chatting
                <ArrowRightIcon className='w-5 h-5 group-hover:translate-x-1 transition-transform'/>
              </button>
            </SignUpButton>
            <SignInButton mode='modal'>
              <button className='px-8 py-4 font-semibold text-base-content/60 hover:text-base-content transition'>
                I have an account
              </button>
            </SignInButton>
          </div>
          {/* avatars */}
          <div className='mt-8 flex items-center gap-4'>
            <div className='avatar-group -space-x-3'>
              <div className='avatar'>
                <div className='w-10 rounded-full border-2 border-base-100'>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User avatar"/>
                </div>
              </div>
              <div className='avatar'>
                <div className='w-10 rounded-full border-2 border-base-100'>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User avatar"/>
                </div>
              </div>
              <div className='avatar'>
                <div className='w-10 rounded-full border-2 border-base-100'>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User avatar"/>
                </div>
              </div>
              <div className='avatar'>
                <div className='w-10 rounded-full border-2 border-base-100'>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User avatar"/>
                </div>
              </div>
              <div className='avatar avatar-placeholder'>
                <div className='w-10 rounded-full border-2 border-base-100 bg-base-300 text-base-content'>
                  <span className='text-xs font-mono'>+5k</span>
                </div>
              </div>
            </div>
            <span className='text-sm text-base-content/70'>
              Join <span className='font-mono text-base-content/80'>10,000+</span> happy users 
            </span>
          </div>
          {/* stats */}
          <div className='mt-12 flex items-center gap-10'>
            <div>
              <div className='text-2xl font-bold font-mono'>10K+</div>
              <div className='text-xs text-base-content/60 mt-1 uppercase tracking-wider'>Users</div>
            </div>
            <div className='w-px h-10 bg-white/10'/>
            <div>
              <div className='text-2xl font-bold font-mono'>99.9%</div>
              <div className='text-xs text-base-content/60 mt-1 uppercase tracking-wider'>Uptime</div>              
            </div>
            <div className='w-px h-10 bg-white/10'/>
            <div>
              <div className='text-2xl font-bold font-mono'>&lt;50ms</div>
              <div className='text-xs text-base-content/60 mt-1 uppercase tracking-wider'>Latency</div>              
            </div>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className=' hidden lg:flex flex-1 relative bg-base-200 items-center justify-center overflow-hidden'>
        {/* grid pattern */}
        <div className=' absolute inset-0'
          style={{
            backgroundImage:`
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        {/* radial glow */}
        <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]  bg-linear-to-r from-amber-500/20 to-orange-500/20 blur-[100px] rounded-full '/>

        {/* image container */}
        <div className=' relative z-10'>
          {/* decorative border */}
          <div className=' absolute -inset-px rounded-3xl bg-linear-to-b from-white/20 to-white/5 p-px'>
            <div className='w-full h-full rounded-3xl bg-base-200'></div>
          </div>
          {/* card */}
          <div className=' relative p-6 rounded-3xl border border-base-300 bg-base-200/80 backdrop-blur-xl shadow-2xl'>
            <img src="/auth.png" alt="Chat illustration" className='w-80 xl:w-96 rounded-2xl' />
            {/* floating elements */}
            <div className=' absolute -top-4 -right-4 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium backdrop-blur-sm'>● 3 online</div>
            <div className=' absolute -bottom-4 -left-4 px-4 py-2.5 bg-base-300/40 border border-base-300 rounded-2xl backdrop-blur-sm'>
              <div className='flex items-center gap-2'>
                <div className='flex -space-x-2'>
                  <div className='w-6 h-6 rounded-full bg-linear-to-br from-amber-400 to-orange-500'></div>
                  <div className='w-6 h-6 rounded-full bg-linear-to-br from-rose-400 to-pink-500'></div>
                </div>
                <span className='text-sm text-base-content/80'>typing...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage