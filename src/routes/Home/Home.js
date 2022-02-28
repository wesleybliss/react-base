import cn from 'classnames'

import './Home.css'

const Home = () => {
    
    return (
        
        <div className="Home">
            
            <div className="intro font-Pacifico">
                <h4>
                    {process.env.APP_TITLE}
                </h4>
                <h5 className="mt-8">
                    {process.env.APP_VERSION}
                </h5>
            </div>
            
            <section className="content-first">
                
                <div>
                    <p>LEFT SECTION</p>
                    <p className="mt-4 text-xl">
                        Pellentesque habitant morbi tristique senectus.
                    </p>
                </div>
                
                <div>
                    <p>RIGHT SECTION</p>
                    <p className="mt-4 text-xl">
                        Pellentesque habitant morbi tristique senectus.
                    </p>
                </div>
                
            </section>
            
            <div className="content-second">
                
                <div>
                    <h4 className="mb-4 text-3xl">LEFT SECTION</h4>
                    <p>Pellentesque habitant morbi.</p>
                </div>
                
                <div>
                    <h4 className="mb-4 text-3xl">CENTER SECTION</h4>
                    <p>Pellentesque habitant morbi.</p>
                </div>
                
                <div>
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
