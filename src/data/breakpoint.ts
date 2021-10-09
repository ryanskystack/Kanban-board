const size = {
    galaxyFold:'280px',
    iphone5se: '320px',
    iphone678: '375px',
    iphone678plus:'414px',
    surfaceDuo:'540px',
    ipad: '768px',
    laptop: '1024px'
};

const device = {    iphone5se: `(min-width: ${size.iphone5se})`,
    iphone678: `(min-width: ${size.iphone678})`,
    iphone678plus: `(min-width: ${size.iphone678plus})`,
    ipad: `(min-width: ${size.ipad})`,
    laptop: `(min-width: ${size.laptop})`,
    surfaceDuo:`(min-width: ${size.surfaceDuo})`,
    galaxyFold:`(min-width: ${size.galaxyFold})`    
};


export default device;