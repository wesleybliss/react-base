import cn from 'classnames'

import reactBaseImage from '@assets/images/reactbase.jpg'

const Home = () => {
    
    return (
        
        <div className="Home w-full flex flex-col">
            
            <div
                className="intro absolute top-0 left-0 right-0 w-full h-screen bg-cover bg-center -z-10"
                style={{ backgroundImage: `url("${reactBaseImage}")` }} />
            
            <div className="intro-fake flex flex-col justify-center items-center content-center w-full h-screen">
                <h4 className="mt-28 text-orange-800 text-6xl text-center font-bold font-Pacifico opacity-70">
                    {process.env.APP_TITLE}
                </h4>
                <h3 className="mt-8 text-orange-800 text-5xl text-center font-bold font-Pacifico opacity-70">
                    {process.env.APP_VERSION}
                </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-20 mt-14 text-center">
                
                <div className="p-8 text-3xl bg-gray-100 rounded">
                    <p>LEFT SECTION</p>
                    <p className="mt-4 text-xl">
                        Pellentesque habitant morbi tristique senectus.
                    </p>
                </div>
                
                <div className="p-8 text-3xl bg-gray-100 rounded">
                    <p>RIGHT SECTION</p>
                    <p className="mt-4 text-xl">
                        Pellentesque habitant morbi tristique senectus.
                    </p>
                </div>
                
            </div>
            
            <div className="grid grid-cols-3 gap-20 mt-20 p-8 text-center">
                
                <div className="flex flex-col p-8 bg-gray-200 rounded">
                    <h4 className="mb-4 text-3xl">LEFT SECTION</h4>
                    <p>Pellentesque habitant morbi.</p>
                </div>
                
                <div className="flex flex-col p-8 bg-gray-200 rounded">
                    <h4 className="mb-4 text-3xl">CENTER SECTION</h4>
                    <p>Pellentesque habitant morbi.</p>
                </div>
                
                <div className="flex flex-col p-8 bg-gray-200 rounded">
                    <h4 className="mb-4 text-3xl">RIGHT SECTION</h4>
                    <p>Pellentesque habitant morbi.</p>
                </div>
                
                {Array(3).fill(null).map((it, i) => (
                    <div key={`lipsum-${i}`}>
                        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
                        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
                    </div>
                ))}
            </div>
            
        </div>
        
    )
    
}

export default Home
