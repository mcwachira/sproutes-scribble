/** @type {import('next').NextConfig} */
const nextConfig = {

    images:{
        remotePatterns:[
            {protocol:'https', hostname:'avatars.githubusercontent.com'},
            {protocol:'https', hostname:'1h3.googleusercontent.com'},
            {protocol:'https', hostname:'utfs.io'},
        ]
    }
};

export default nextConfig;
